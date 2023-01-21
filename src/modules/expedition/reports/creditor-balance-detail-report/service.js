import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "credit-balance/reports/detail";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getXls(info) {
    var query = "";
    if (info.supplierName !== null && info.divisionId !== null) {
      query = `?supplierName=${info.supplierName}&divisionId=${info.divisionId}&month=${info.month}&year=${info.year}&isImport=${info.isImport}`;
    } else if (info.supplierName !== null && info.divisionId === null) {
      query = `?supplierName=${info.supplierName}&month=${info.month}&year=${info.year}&isImport=${info.isImport}`;
    } else if (info.supplierName === null && info.divisionId !== null) {
      query = `?divisionId=${info.divisionId}&month=${info.month}&year=${info.year}&isImport=${info.isImport}`;
    } else {
      query = `?month=${info.month}&year=${info.year}&isImport=${info.isImport}`;
    }

    let endpoint = `${serviceUri}/downloads/xls${query}&isForeignCurrency=${true}`;
    return super.getXls(endpoint);
  }

  getPdf(info) {
    var query = "";
    if (info.supplierName !== null && info.divisionId !== null) {
      query = `?supplierName=${info.supplierName}&divisionId=${info.divisionId}&month=${info.month}&year=${info.year}&isImport=${info.isImport}`;
    } else if (info.supplierName !== null && info.divisionId === null) {
      query = `?supplierName=${info.supplierName}&month=${info.month}&year=${info.year}&isImport=${info.isImport}`;
    } else if (info.supplierName === null && info.divisionId !== null) {
      query = `?divisionId=${info.divisionId}&month=${info.month}&year=${info.year}&isImport=${info.isImport}`;
    } else {
      query = `?month=${info.month}&year=${info.year}&isImport=${info.isImport}`;
    }

    let endpoint = `${serviceUri}/downloads/pdf${query}&isForeignCurrency=${true}`;
    return super.getPdf(endpoint);
  }
}
