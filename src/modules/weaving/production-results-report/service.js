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
  
  const serviceUri = 'weaving/production-results';
  
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
  
    getReportXls(machine, order, shift, weavingUnit, dateFrom, dateTo) {
      var endpoint = `${serviceUri}/get-report`;
      var query = '';
  
      if (machine) {
        if (query === '') query = `machineId=${(machine.Id)}`;
        else query = `${query}&machineId=${(machine.Id)}`;
      }
      if (order) {
        if (query === '') query = `orderId=${(order.Id)}`;
        else query = `${query}&orderId=${(order.Id)}`;
      }
      if (shift) {
        if (query === '') query = `shiftId=${(shift.Id)}`;
        else query = `${query}&shiftId=${(shift.Id)}`;
      }
      if (weavingUnit) {
        if (query === '') query = `weavingUnitId=${weavingUnit.Id}`;
        else query = `${query}&weavingUnitId=${weavingUnit.Id}`;
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
        endpoint = `${serviceUri}/get-report?${query}`;
  
      return super.getXls(endpoint);
    }
  }
  