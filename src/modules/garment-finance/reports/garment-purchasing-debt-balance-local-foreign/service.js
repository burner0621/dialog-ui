import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-debt-balances/summary";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getXls(info) {
    let endpoint = `${serviceUri}/downloads/xls?supplierId=${info.supplierId}&month=${info.month}&year=${info.year}&isForeignCurrency=${info.isForeignCurrency}&supplierIsImport=${info.supplierIsImport}`;
    return super.getXls(endpoint);
  }

  getPdf(info) {
    let endpoint = `${serviceUri}/downloads/pdf?supplierId=${info.supplierId}&month=${info.month}&year=${info.year}&isForeignCurrency=${info.isForeignCurrency}&supplierIsImport=${info.supplierIsImport}`;
    return super.getPdf(endpoint);
  }
}
