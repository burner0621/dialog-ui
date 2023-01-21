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
    Container
  } from "aurelia-dependency-injection";
  import {
    Config
  } from "aurelia-api";
  import {
    debug
  } from 'util';
  
  const serviceUri = 'weaving/daily-operations-loom';
  
  export class Service extends RestService {
  
    constructor(http, aggregator, config, endpoint) {
      super(http, aggregator, config, "weaving");
    }
  
    getById(id) {
      var endpoint = `${serviceUri}/${id}`;
      return super.get(endpoint);
    }
  
    getUnitById(Id) {
      var config = Container.instance.get(Config);
      var _endpoint = config.getEndpoint("core");
      var _serviceUri = `master/units/${Id}`;
  
      return _endpoint.find(_serviceUri).then(result => {
        return result.data;
      });
    }
  
    getReportData(info) {
      var endpoint = `${serviceUri}/get-report`;
  
      return super.list(endpoint, info);
    }
  
    getReportXls(order, constructions, status, weavingUnit, dateFrom, dateTo) {
      var endpoint = `${serviceUri}/get-report`;
      var query = '';
  
      if (order) {
        if (query === '') query = `orderId=${(order.Id)}`;
        else query = `${query}&orderId=${(order.Id)}`;
      }
      if (constructions) {
        if (query === '') query = `constructionId=${(constructions.Id)}`;
        else query = `${query}&constructionId=${(constructions.Id)}`;
      }
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
      if (status) {
        if (query === '') query = `operationStatus=${status}`;
        else query = `${query}&operationStatus=${status}`;
      }
      if (query !== '')
        endpoint = `${serviceUri}/get-report?${query}`;
  
      return super.getXls(endpoint);
    }
  }
  