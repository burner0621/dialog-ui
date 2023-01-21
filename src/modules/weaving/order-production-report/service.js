import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "weaving/orders/order-by-period";
const _serviceUri = "weaving/orders";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "weaving");
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  searchSOP(month, year, unitName, unitId) {
    var status = "ALL";
    var endpoint = `${serviceUri}/${month}/${year}/unit-name/${unitName}/unit-id/${unitId}/status/${status}`;
    return super.list(endpoint);
  }

  getPdfByPeriod(month, year, unitName, unitId) {
    var status = "ESTIMATED";
    var endpoint = `${serviceUri}/${month}/${year}/unit-name/${unitName}/unit-id/${unitId}/status/${status}`;
    return super.getPdf(endpoint);
  }

  getReportData(info) {
    var endpoint = `${_serviceUri}/get-report`;

    return super.list(endpoint, info);
  }

  getReportPdf(weavingUnit, dateFrom, dateTo) {
    var endpoint = `${_serviceUri}/get-report`;
    var query = '';

    if (weavingUnit) {
      if (query === '') query = `unitId=${weavingUnit.Id}`;
      else query = `${query}&unitId=${weavingUnit.Id}`;
    }
    if (dateFrom) {
      if (query === '') query = `dateFrom=${(dateFrom)}`;
      else query = `${query}&dateFrom=${(dateFrom)}`;
    }
    if (dateTo) {
      if (query === '') query = `dateTo=${(dateTo)}`;
      else query = `${query}&dateTo=${(dateTo)}`;
    }
    if (query !== '')
      endpoint = `${_serviceUri}/get-report?${query}`;
      
    return super.getPdf(endpoint);
  }
}
