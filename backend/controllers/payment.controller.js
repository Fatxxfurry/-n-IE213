import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";
export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode, phoneNumber, address } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid or empty product list" });
    }

    let totalAmount = 0;
    const lineItems = products.map((product) => {
      totalAmount += product.price * product.quantity;
      return {
        price_data: {
          currency: "vnd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.price,
        },
        quantity: product.quantity,
      };
    });

    // Xử lý coupon (nếu có)
    const discounts = [];
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        // Stripe chỉ cần discount, không cần tính lại totalAmount ở đây
        const stripeCoupon = await createStripeCoupon(
          coupon.discountPercentage
        );
        discounts.push({
          coupon: stripeCoupon.id,
        });

        // Giảm giá trên totalAmount chỉ để hiển thị
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }
    // Tạo session (luôn luôn tạo)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase/cancel`,
      discounts: discounts,
      metadata: {
        couponCode: couponCode || null,
        userId: req.user._id.toString(),
        products: JSON.stringify(
          products.map((product) => ({
            productId: product.id || product._id,
            quantity: product.quantity,
            price: product.price,
          }))
        ),
        phoneNumber,
        address,
      },
    });
    if (totalAmount >= process.env.MINIMUM_PURCHASE_AMOUNT_FOR_COUPON) {
      await createNewCoupon(req.user._id);
    }
    return res.status(200).json({
      sessionId: session.id,
      totalAmount,
      couponCode: couponCode || null,
    });
  } catch (error) {
    console.log("Error in createCheckoutSession:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // Check if order already exists to avoid duplicates
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Order already exists",
        orderId: existingOrder._id,
      });
    }

    // Deactivate coupon if any
    if (session.metadata.couponCode) {
      await Coupon.findOneAndUpdate(
        { code: session.metadata.couponCode },
        { isActive: false }
      );
    }
    // Parse products and create order
    const products = JSON.parse(session.metadata.products);

    const newOrder = new Order({
      user: session.metadata.userId,
      products: products.map((product) => ({
        product: product.productId,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: session.amount_total,
      stripeSessionId: sessionId,
      phoneNumber: session.metadata.phoneNumber,
      address: session.metadata.address,
      status: "processing",
    });

    await newOrder.save();
    return res.status(200).json({
      success: true,
      message: "Order created successfully and used coupon deactivated",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log("Error in checkout-success", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

async function createStripeCoupon(discountPercentage) {
  try {
    const coupon = await stripe.coupons.create({
      percent_off: discountPercentage,
      duration: "once",
    });
    return coupon;
  } catch (error) {
    console.log("Error in createStripeCoupon", error.message);
    return null;
  }
}
async function createNewCoupon(userId) {
  try {
    const existingCoupon = await Coupon.findOne({ userId });
    if (existingCoupon) {
      console.log("User already has a coupon. Skipping creation.");
      return;
    }
    const coupon = new Coupon({
      code: "GIFT" + Math.random().toString(36).substring(7).toUpperCase(),
      discountPercentage: 10,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      userId,
    });
    await coupon.save();
    console.log("Coupon created successfully for user:", userId);
  } catch (error) {
    console.log("Error in createNewCoupon:", error.message);
  }
}
