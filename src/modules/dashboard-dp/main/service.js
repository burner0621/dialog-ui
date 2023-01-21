import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const getFilePeriode = "GetFilePeriode";
const getArea = "GetArea";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "dyeing");
  }

  search(info) {
    var endpoint = `${getFilePeriode}`;
    return super.list(endpoint, info);
  }

  getArea() {
    var endpoint = `${getArea}`;
    return super.get(endpoint);
  }
}
