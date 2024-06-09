const { randomBytes, createHmac } = require("crypto");
const axios = require("axios");

const token = process.env.SWITCHBOT_TOKEN;
const secret = process.env.SWITCHBOT_SECRET;

const AC_ID = process.env.AC_ID;

const SwitchBot = axios.create({
  baseURL: "https://api.switch-bot.com",
});

SwitchBot.interceptors.request.use((config) => {
  const t = Date.now();
  const nonce = randomBytes(10).toString("hex");
  const data = token + t + nonce;
  const signTerm = createHmac("sha256", secret)
    .update(Buffer.from(data, "utf-8"))
    .digest();
  const sign = signTerm.toString("base64");

  config.headers.Authorization = token;
  config.headers.sign = sign;
  config.headers.nonce = nonce;
  config.headers.t = t;

  return config;
});

module.exports = {
  SwitchBot,
  AC_ID,
};
