import axios from "axios";
import crypto from "crypto";
const paymentHandlers = {
  stripe: async () => {},
  momo: async (orderData) => {
    const { products, user, phoneNumber, address, couponCode } = orderData;
    const endpoint = process.env.MOMO_ENDPOINT;
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const orderId = Date.now().toString();
    const requestId = orderId;
    const orderInfo = "Thanh toán qua MoMo";
    const redirectUrl = "https://yourwebsite.com/notify";
    const ipnUrl = "https://yourwebsite.com/notify";
    const requestType = "captureWallet";
    const amount = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const extraData = JSON.stringify({
      products,
      userId: user._id,
      phoneNumber,
      address,
      couponCode,
      method: "momo",
    });

    const rawSignature =
      "partnerCode=" +
      partnerCode +
      "&orderId=" +
      orderId +
      "&requestId=" +
      requestId +
      "&orderInfo=" +
      orderInfo +
      "&amount=" +
      amount +
      "&redirectUrl=" +
      redirectUrl +
      "&ipnUrl=" +
      ipnUrl +
      "&extraData=" +
      extraData +
      "&requestType=" +
      requestType;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const data = {
      partnerCode,
      orderId,
      requestId,
      orderInfo,
      amount,
      redirectUrl,
      ipnUrl,
      requestType,
      extraData,
      signature,
    };

    const response = await axios.post(endpoint, data);
    return response.data;
  },
  vnpay: async () => {},
};
