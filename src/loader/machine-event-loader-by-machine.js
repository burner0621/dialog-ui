import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'finishing-printing/monitoring-event-reports/by-machine';

module.exports = function (keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("production-azure");
  return endpoint.find(resource, { keyword: keyword, machineId: filter, size: 10 })
    .then(results => {
      // return results.data.map(machineEvent => {
      //     machineEvent.toString = function () {
      //         return `${this.no}`;
      //     }
      //     return deliveryOrder;
      // });
      return results.data
    });
}