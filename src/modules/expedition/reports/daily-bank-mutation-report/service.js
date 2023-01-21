import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "daily-bank-transactions/mutation/report";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    if (!info.bankId)
      info.bankId != 0;
    let endpoint = `${serviceUri}`;
    // let endpoint = `${serviceUri}?bankId=${info.bankId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.list(endpoint, info);
  }

  getXls(info) {
    if (!info.bankId)
      info.bankId != 0;
    let endpoint = `${serviceUri}/download?bankId=${info.bankId}&month=${info.month}&year=${info.year}`;
    return super.getXls(endpoint);
  }

  getPdf(info) {
    if (!info.bankId)
      info.bankId != 0;
    let endpoint = `${serviceUri}/pdf?bankId=${info.bankId}&month=${info.month}&year=${info.year}`;
    return super.getPdf(endpoint);
  }
}
