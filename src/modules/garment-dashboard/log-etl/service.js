import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const getETLLog = "ETLLog";
const postManualETL = "manual-etl";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "garment-shipping");
  }

  search(info) {
    var endpoint = `${getETLLog}`;
    return super.list(endpoint, info);
  }

  postManualETL(data) {
    var endpoint = `${postManualETL}`;
    return super.post(endpoint, data);
  }
}
