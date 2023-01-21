import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const getData = "GetTemporary";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "ItInven");
  }

  search() {
    var endpoint = `${getData}`;
    return super.list(endpoint);
  }

  updatedata(data){
    var uri="PostBeacukai";
    var endpoint = `${uri}`; 

    return super.put(endpoint, data);

  }
}
