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

const serviceUri = 'weaving/daily-operations-reaching';

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

  getReportXls(machine, order, constructions, sizingBeam, status, weavingUnit, startDate, endDate) {
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
    if (constructions) {
      if (query === '') query = `constructionId=${(constructions.Id)}`;
      else query = `${query}&constructionId=${(constructions.Id)}`;
    }
    if (sizingBeam) {
      if (query === '') query = `beamId=${(sizingBeam.Id)}`;
      else query = `${query}&beamId=${(sizingBeam.Id)}`;
    }
    if (status) {
      if (query === '') query = `operationStatus=${status}`;
      else query = `${query}&operationStatus=${status}`;
    }
    if (weavingUnit) {
      if (query === '') query = `unitId=${weavingUnit.Id}`;
      else query = `${query}&unitId=${weavingUnit.Id}`;
    }
    if (startDate) {
      if (query === '') query = `dateFrom=${(startDate)}`;
      else query = `${query}&dateFrom=${(startDate)}`;
    }
    if (endDate) {
      if (query === '') query = `dateTo=${(endDate)}`;
      else query = `${query}&dateTo=${(endDate)}`;
    }
    if (query !== '')
      endpoint = `${serviceUri}/get-report?${query}`;

    return super.getXls(endpoint);
  }
}
