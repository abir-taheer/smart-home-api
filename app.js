const { config } = require("dotenv");
config();

const { SwitchBot, AC_ID } = require("./switchbot");
const express = require("express");
const { Tuya, BEDROOM_CURTAIN_ID } = require("./tuya");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  if (req.headers.authorization !== process.env.AUTHORIZATION) {
    return res.status(401).send("Unauthorized");
  }

  next();
});

app.post("/ac/off", async (req, res) => {
  const body = {
    command: "turnOff",
    parameter: "default",
    commandType: "command",
  };

  const response = await SwitchBot.post(
    `/v1.1/devices/${AC_ID}/commands`,
    body,
  );

  res.json(response.data);
});

app.post("/ac/on", async (req, res) => {
  const body = {
    command: "turnOn",
    parameter: "default",
    commandType: "command",
  };

  const response = await SwitchBot.post(
    `/v1.1/devices/${AC_ID}/commands`,
    body,
  );
  res.json(response.data);
});

app.post("/bedroom-curtain/open", async (req, res) => {
  const response = await Tuya.client.request({
    path: `/v2.0/cloud/thing/${BEDROOM_CURTAIN_ID}/shadow/properties/issue`,
    method: "POST",
    body: {
      properties: {
        control: "open",
      },
    },
  });

  res.json(response.data);
});

app.post("/bedroom-curtain/close", async (req, res) => {
  const response = await Tuya.client.request({
    path: `/v2.0/cloud/thing/${BEDROOM_CURTAIN_ID}/shadow/properties/issue`,
    method: "POST",
    body: {
      properties: {
        control: "close",
      },
    },
  });

  res.json(response.data);
});

module.exports = { app };
