const DeviceDetector = require("node-device-detector");

function detectDeviceInformation(request, response, next) {
  const userAgent = request.get("User-Agent");
  const deviceDetector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
  });

  const detector = deviceDetector.detect(userAgent);

  const device = {
    type: detector.device.type ? detector.device.type : "unknown device type",
    name: detector.os.name ? detector.os.name : "unknown device name",
  };

  request.device = device;

  return next();
}

module.exports = {
  detectDeviceInformation,
};
