import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-debt-balances/detail";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getXls(info) {
    let endpoint = `${serviceUri}/downloads/xls?arrivalDate=${info.arrivalDate}&supplierTypeFilter=${info.supplierTypeFilter}&supplierId=${info.supplierId}&currencyId=${info.currencyId}&paymentType=${info.paymentType}`;
    return super.getXls(endpoint);
  }

  getPdf(info) {
    let endpoint = `${serviceUri}/downloads/pdf?arrivalDate=${info.arrivalDate}&supplierTypeFilter=${info.supplierTypeFilter}&supplierId=${info.supplierId}&currencyId=${info.currencyId}&paymentType=${info.paymentType}`;
    return super.getPdf(endpoint);
  }
}
