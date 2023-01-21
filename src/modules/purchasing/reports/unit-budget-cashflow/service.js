import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "budget-cashflows";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(arg) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, arg);
  }

  getItems(args) {
    let endpoint = `${serviceUri}/items`;
    return super.list(endpoint, args);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUri}`;
    return super.put(endpoint, data);
  }

  getItemsInitialCashBalance(args) {
    let endpoint = `${serviceUri}/initial-cash-balance/items`;
    return super.list(endpoint, args);
  }

  createInitialCashBalance(data) {
    var endpoint = `${serviceUri}/initial-cash-balance`;
    return super.post(endpoint, data);
  }

  updateInitialCashBalance(data) {
    var endpoint = `${serviceUri}/initial-cash-balance`;
    return super.put(endpoint, data);
  }

  getItemsRealCashBalance(args) {
    let endpoint = `${serviceUri}/real-cash-balance/items`;
    return super.list(endpoint, args);
  }

  createRealCashBalance(data) {
    var endpoint = `${serviceUri}/real-cash-balance`;
    return super.post(endpoint, data);
  }

  updateRealCashBalance(data) {
    var endpoint = `${serviceUri}/real-cash-balance`;
    return super.put(endpoint, data);
  }

  getXls(query) {
    let endpoint = `${serviceUri}/download/xls?unitId=${query.unitId}&date=${query.date}`;
    return super.getXls(endpoint);
  }

  getPdf(query) {
    let endpoint = `${serviceUri}/download/pdf?unitId=${query.unitId}&date=${query.date}`;
    return super.getPdf(endpoint);
  }

  // search(unitId, date) {
  //   return fetch(
  //     "http://localhost:9000/src/modules/purchasing/reports/unit-budget-cashflow/dummy.json"
  //   ).then((response) => response.json());
  // }
}
