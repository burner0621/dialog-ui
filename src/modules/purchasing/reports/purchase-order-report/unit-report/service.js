import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service'; 

const serviceUri = 'purchase-orders/reports/units';
const serviceUriDetail = 'purchase-orders/reports/subUnits';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  getDataUnit(sdate, edate) {
    var endpoint = `${serviceUri}?dateFrom=${sdate}&dateTo=${edate}`;
    return super.get(endpoint);
  }

  getDetailUnit(sdate, edate, divisiId) {
    var endpoint = `${serviceUri}/detail?divisionId=${divisiId}&dateFrom=${sdate}&dateTo=${edate}`;
    return super.get(endpoint);
  }
  generateExcel(sdate, edate) {
    var endpoint = `${serviceUri}/download?dateFrom=${sdate}&dateTo=${edate}`;
    return super.getXls(endpoint);
  }

}