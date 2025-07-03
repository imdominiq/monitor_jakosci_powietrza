let latestSensorData = {};

function setSensorData(data) {
  latestSensorData = data;
}

function getSensorData() {
  return latestSensorData;
}

module.exports = {
  setSensorData,
  getSensorData,
};
