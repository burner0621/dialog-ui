import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "budget-cashflows/divisions";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(arg) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, arg);
  }

  getXls(query) {
    let endpoint = `${serviceUri}/download/xls?date=${query.date}`;
    return super.getXls(endpoint);
  }

  getPdf(query) {
    let endpoint = `${serviceUri}/download/pdf?date=${query.date}`;
    return super.getPdf(endpoint);
  }

  // search() {
  //   return fetch(
  //     "http://localhost:9000/src/modules/purchasing/reports/division-all-budget-cashflow/dummy.json"
  //   ).then((response) => response.json());
  // }
}
