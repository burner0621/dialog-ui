import {
    inject,
    Lazy
  } from "aurelia-framework";
  import {
    HttpClient
  } from "aurelia-fetch-client";
  import {
    RestService
  } from "../../../utils/rest-service";
  import {
    debug
  } from 'util';
  var moment = require('moment');
  
  const serviceUri = 'weaving/daily-operations-warping';
  
  export class Service extends RestService {
  
    constructor(http, aggregator, config, endpoint) {
      super(http, aggregator, config, "weaving");
    }
  
    getById(id) {
      var endpoint = `${serviceUri}/${id}`;
      return super.get(endpoint);
    }
  
    getReportData(info) {
      var endpoint = `${serviceUri}/get-warping-broken-report`;
      return super.list(endpoint, info);
    }
  
    getReportXls(month, year, weavingUnitId) {
      var endpoint = `${serviceUri}/get-warping-broken-report`;
      var query = '';
  
      if (month) {
        if (query === '') query = `month=${(month)}`;
        else query = `${query}&month=${(month)}`;
      }
      if (year) {
        if (query === '') query = `year=${(year)}`;
        else query = `${query}&year=${(year)}`;
      }
      if (weavingUnitId) {
        if (query === '') query = `weavingUnitId=${(weavingUnitId)}`;
        else query = `${query}&weavingUnitId=${(weavingUnitId)}`;
      }
  
      if (query !== '') {
        endpoint = `${serviceUri}/get-warping-broken-report?${query}`; 
      }
      return super.getXls(endpoint);
    }
  }
  