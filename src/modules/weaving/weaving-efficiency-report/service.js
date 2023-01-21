import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "weaving/orders/order-by-period";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "weaving");
  }

//   searchConstructions(month, year, unitName, unitId) {
//     var status = "ALL";
//     var endpoint = `${serviceUri}/${month}/${year}/unit-name/${unitName}/unit-id/${unitId}/status/${status}`;
//     return super.list(endpoint);
//   }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

//   getExcelByPeriod(month, year, unitName, unitId) {
//     var status = "ESTIMATED";
//     var endpoint = `${serviceUri}/${month}/${year}/unit-name/${unitName}/unit-id/${unitId}/status/${status}`;
//     return super.getPdf(endpoint);
//   }

  // getOrders(month, year, unitId){
  //   var endpoint = `${serviceUri}/${month}/${year}/unit/${unitId}`;
  //   return super.list(endpoint, info);
  // }

  // create(data) {
  //   var endpoint = `${serviceUri}`;
  //   return super.post(endpoint, data);
  // }

  // update(data) {
  //   var endpoint = `${serviceUri}/${data.id}`;
  //   return super.put(endpoint, data);
  // }

  // delete(data) {
  //   var endpoint = `${serviceUri}/${data.id}`;
  //   return super.delete(endpoint, data);
  // }

  // getByCode(code) {
  //   var endpoint = `${serviceUri}?keyword=${code}`;
  //   return super.get(endpoint);
  // }
}
