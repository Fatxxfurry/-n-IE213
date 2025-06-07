import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";
export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;
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
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      };
    });
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/purchase/cancel`,
        discount: coupon
          ? {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            }
          : null,
        metadata: {
          couponCode: couponCode || null,
          userId: req.user._id.toString(),
          products: JSON.stringify(
            products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
              price: product.price,
            }))
          ),
        },
      });
    }
    if (totalAmount >= process.env.MINIMUM_PURCHASE_AMOUNT_FOR_COUPON) {
      await createNewCoupon(req.user._id);
    }
    res.status(200).json({ sessionId: session.id, totalAmount, couponCode });
  } catch (error) {
    console.log("Error in createCheckoutSession", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      const coupon = await Coupon.findOneAndUpdate(
        { code: session.metadata.couponCode },
        { isActive: false }
      );
    }
    // Add order to database
    products = JSON.parse(session.metadata.products);
    const newOrder = new Order({
      userId: session.metadata.userId,
      products: products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: session.amount_total,
      stripeSessionId: sessionId,
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
    const coupon = new Coupon({
      code: "GIFT" + Math.random().toString(36).substring(7).toUpperCase(),
      discountPercentage: 10,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      userId: userId,
    });
    await coupon.save();
  } catch (error) {
    console.log("Error in createNewCoupon", error.message);
  }
}
