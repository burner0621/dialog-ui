import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "master/budgeting-categories";
// const base = "master/accounting-categories";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  // getAccountingCategory(acId) {
  //   var endpoint = `${base}/${acId}`;
  //   return super.get(endpoint);
  // }

  update(data) {
    let endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }
}
