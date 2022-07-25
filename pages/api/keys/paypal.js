import requestValidator from "../../../middelware/requestValidator";

const handler = (req, res) => {
  if (req.method !== "GET") {
    return res.send({ message: "only get request are allowed" });
  }
  res.status(200).send(process.env.PAYPAL_CLIENT_ID);
};
export default handler;
