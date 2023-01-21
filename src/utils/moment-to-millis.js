var moment = require("moment");

module.exports = function (timeInMoment) {
  return Number(timeInMoment.format('x'));
} 
