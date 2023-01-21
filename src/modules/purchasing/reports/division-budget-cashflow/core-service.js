import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "master";

export class CoreService extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "core");
  }

  getCurrencyById(id) {
    var endpoint = `${serviceUri}/currencies/${id}`;
    return super
      .get(endpoint)
      .then((response) => response)
      .catch((error) => console.error("error", error));
  }

  getUnitById(id) {
    var endpoint = `${serviceUri}/units/${id}`;
    return super
      .get(endpoint)
      .then((response) => response)
      .catch((error) => console.error("error", error));
  }

  getDivisionById(id) {
    var endpoint = `${serviceUri}/divisions/${id}`;
    return super
      .get(endpoint)
      .then((response) => response)
      .catch((error) => console.error("error", error));
  }
}
