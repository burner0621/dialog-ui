import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceURI = "garment-purchasing-pph-bank-expenditure-note";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceURI}/report`;
    return super.list(endpoint, info);
  }

  searchGroup(info) {
    let endpoint = `${serviceURI}/report-group`;
    return super.list(endpoint, info);
  }
  downloadXls(args){
    let endpoint = `${serviceURI}/report/xls`;
    return super.getPdf(endpoint,args);
  }
}
