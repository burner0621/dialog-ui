import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "daily-bank-transactions/daily-balance/report";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceUri}/accountbank`;
    // let endpoint = `${serviceUri}?bankId=${info.bankId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.list(endpoint, info);
  }

  searchCurrency(info) {
    let endpoint = `${serviceUri}/currency`;
    // let endpoint = `${serviceUri}?bankId=${info.bankId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.list(endpoint, info);
  }

  getXls(info) {
    const divisionName = info.divisionName
      ? `&divisionName=${info.divisionName}`
      : "";
    let endpoint = `${serviceUri}/download?bankId=${info.bankId}&startDate=${info.startDate}&endDate=${info.endDate}${divisionName}`;
    return super.getXls(endpoint);
  }
}
