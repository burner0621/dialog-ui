import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "input-aval";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getPreAval(searchDate, searchShift, searchGroup) {
    var endpoint = `${serviceUri}/pre-aval`;
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
      endpoint = `${serviceUri}/pre-aval?${query}`;
    }
    
    return super.get(endpoint);
  }

  getPreAvalAll() {
    var endpoint = `${serviceUri}/pre-aval/all`;
    
    return super.get(endpoint);
  }

  getById(id) {
    let endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    let endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }
  
  reject(data) {
    var endpoint = `${serviceUri}/reject`;
    return super.post(endpoint, data);
  }
  // update(data) {
  //   let endpoint = `${serviceUri}/${data.id}`;
  //   return super.put(endpoint, data);
  // }

  delete(data) {
    let endpoint = `${serviceUri}/${data.id}`;
    return super.delete(endpoint, data);
  }

  generateExcel(info) {
    var endpoint = `${serviceUri}/xls?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.getXls(endpoint);
}
}
