import {
  inject,
  Lazy
} from 'aurelia-framework';
import {
  HttpClient
} from 'aurelia-fetch-client';
import {
  Config
} from "aurelia-api";
import {
  RestService
} from "../../../utils/rest-service";

const serviceUri = "weaving/beam-stock-monitoring";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  search() {
    var endpoint = `${serviceUri}`;
    return super.get(endpoint);
  }
}
