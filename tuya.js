const { TuyaContext } = require("@tuya/tuya-connector-nodejs");

const BEDROOM_CURTAIN_ID = process.env.BEDROOM_CURTAIN_ID;

const Tuya = new TuyaContext({
  baseUrl: process.env.TUYA_BASE_URL,
  accessKey: process.env.TUYA_CLIENT_ID,
  secretKey: process.env.TUYA_SECRET_KEY,
});

module.exports = {
  Tuya,
  BEDROOM_CURTAIN_ID,
};
