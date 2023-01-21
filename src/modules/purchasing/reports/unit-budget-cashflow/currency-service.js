import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "master/currencies";

export class CurrencyService extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "core");
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super
      .get(endpoint)
      .then((response) => response)
      .catch((error) => console.error("error", error));
  }
}
