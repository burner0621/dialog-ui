import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-purchasing/memo/report";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, { filter: JSON.stringify(info) });
  }

  getXls(info) {
    var query = `?year=${info.year}&month=${info.month}`;

    if (info.accountingBookId){
      query += `&accountingBookId=${info.accountingBookId}&accountingBookType=${info.accountingBookType}`;

      if(info.valas){
        query += `&valas=${info.valas}`;
      }
    }

    let endpoint = `${serviceUri}/xls${query}`;
    return super.getXls(endpoint);
  }

  getPdf(info) {
    var query = `?year=${info.year}&month=${info.month}`;

    if (info.accountingBookId){
      query += `&accountingBookId=${info.accountingBookId}&accountingBookType=${info.accountingBookType}`;

      if(info.valas){
        query += `&valas=${info.valas}`;
      }
    }

    let endpoint = `${serviceUri}/pdf${query}`;
    return super.getPdf(endpoint);
  }
}
