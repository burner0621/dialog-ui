import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "output-aval";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getAvailableAval(searchDate, searchShift, searchGroup) {
    var endpoint = `${serviceUri}/available-aval`;
    var query = "";

    if (searchDate) {
      if (query === "") query = `searchDate=${searchDate}`;
      else query = `${query}&searchDate=${searchDate}`;
    }
    if (searchShift) {
      if (query === "") query = `searchShift=${searchShift}`;
      else query = `${query}&searchShift=${searchShift}`;
    }
    if (searchGroup) {
      if (query === "") query = `searchGroup=${searchGroup}`;
      else query = `${query}&searchGroup=${searchGroup}`;
    }
    if (query !== "") {
      endpoint = `${serviceUri}/available-aval?${query}`;
    }

    return super.get(endpoint);
  }
  getAllAvailableAval() {
    var endpoint = `${serviceUri}/available-aval/all`;

    return super.get(endpoint);
  }
  getAvalInfoByType(type) {
    var endpoint = `${serviceUri}/aval-summary-by-type`;
    var query = "";
    if (type) {
      if (query === "") query = `avalType=${type}`;
      else query = `${query}&avalType=${type}`;
    }
    if (query !== "") {
      endpoint = `${serviceUri}/aval-summary-by-type?${query}`;
    }
    return super.get(endpoint);
  }

  getAvailableAvalByBon(bonId) {
    var endpoint = `${serviceUri}/available-aval/${bonId}`;
    return super.get(endpoint);
  }

  getById(id) {
    let endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  generateExcelReportById(id) {
    let endpoint = `${serviceUri}/xls/${id}`;
    return super.getXls(endpoint);
  }

  create(data) {
    let endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  generateExcel(id) {
    var endpoint = `${serviceUri}/xls/${id}`;

    return super.getXls(endpoint);
  }

  generateExcelAll(info) {
    var endpoint = `${serviceUri}/xls?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.getXls(endpoint);
  }

  update(data) {
    let endpoint = `${serviceUri}/${data.id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    let endpoint = `${serviceUri}/${data.id}`;
    return super.delete(endpoint, data);
  }
}
