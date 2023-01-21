import { buildQueryString } from "aurelia-path";
import { RestService } from "../../../utils/rest-service";

const uri = "garment-purchasing-expeditions/report";

class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${uri}`;
    return super.list(endpoint, info);
  }

  xls(info) {
    console.log(info);
    let endpoint = `${uri}/xls?${buildQueryString(info)}`;
    return super.getXls(endpoint);
  }
}

class AzureService extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  search(info) {
    let endpoint = `${uriPurchasingDocumentExpeditionReport}`;
    return super.list(endpoint, info);
  }
}

export { Service, AzureService };
