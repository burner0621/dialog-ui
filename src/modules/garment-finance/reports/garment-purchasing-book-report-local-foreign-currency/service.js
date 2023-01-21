import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-purchasing-book-reports";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  search(info) {
    info.isForeignCurrency = true;
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getXls(info) {
    let endpoint = `${serviceUri}/downloads/xls?billNo=${info.billNo}&paymentBill=${info.paymentBill}&category=${info.category}&startDate=${info.startDate}&endDate=${info.endDate}&isForeignCurrency=${true}&isImportSupplier=${false}`;
    return super.getXls(endpoint);
  }

  getPdf(info) {
    let endpoint = `${serviceUri}/download/pdf?billNo=${info.billNo}&paymentBill=${info.paymentBill}&category=${info.category}&startDate=${info.startDate}&endDate=${info.endDate}&isForeignCurrency=${true}&isImportSupplier=${false}`;
    return super.getPdf(endpoint);
  }
}
