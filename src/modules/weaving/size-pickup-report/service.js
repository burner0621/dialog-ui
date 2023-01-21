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

const serviceUri = 'weaving/daily-operations-sizing';
const shiftUri = 'weaving/shifts';

export class ShiftService extends RestService {
  constructor(http, aggregator, config, api) {
      super(http, aggregator, config, "weaving");
  }

  getShiftData(info) {
      var endpoint = `${shiftUri}`;
      return super.list(endpoint, info);
  }
}

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }
  
  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  getReportData(info) {
    var endpoint = `${serviceUri}/get-size-pickup-report`;    
    return super.list(endpoint, info);
  }

  getReportXls(shift, spuStatus, weavingUnit, date, dateFrom, dateTo, month) {
    var endpoint = `${serviceUri}/get-size-pickup-report`;
    var query = '';

    if (shift) {
      if (query === '') query = `shiftId=${(shift.Id)}`;
      else query = `${query}&shiftId=${(shift.Id)}`;
    }
    if (spuStatus) {
      if (query === '') query = `spuStatus=${spuStatus}`;
      else query = `${query}&spuStatus=${spuStatus}`;
    }
    if (weavingUnit) {
      if (query === '') query = `unitId=${weavingUnit.Id}`;
      else query = `${query}&unitId=${weavingUnit.Id}`;
    }
    if (date) {
      if (query === '') query = `date=${(date)}`;
      else query = `${query}&date=${(date)}`;
    }
    if (dateFrom) {
      if (query === '') query = `dateFrom=${(dateFrom)}`;
      else query = `${query}&dateFrom=${(dateFrom)}`;
    }
    if (dateTo) {
      if (query === '') query = `dateTo=${(dateTo)}`;
      else query = `${query}&dateTo=${(dateTo)}`;
    }
    if (month) {
      if (query === '') query = `month=${(month)}`;
      else query = `${query}&month=${(month)}`;
    }
    if (query !== '')
      endpoint = `${serviceUri}/get-size-pickup-report?${query}`;
    return super.getXls(endpoint);
  }

  // //Get Data
  // getDataByDate(date, weavingUnitId, shiftId, spu) {
  //   var periodType = "date";
  //   var endpoint = `${serviceUri}/${periodType}/${date}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
  //   return super.get(endpoint);
  // }

  // getDataByDateRange(startDate, endDate, weavingUnitId, shiftId, spu) {
  //   var periodType = "daterange";
  //   var endpoint = `${serviceUri}/${periodType}/start-date/${startDate}/end-date/${endDate}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
  //   return super.get(endpoint);
  // }

  // getDataByMonth(month, weavingUnitId, shiftId, spu) {
  //   var periodType = "month";
  //   var endpoint = `${serviceUri}/${periodType}/${month}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
  //   return super.get(endpoint);
  // }

  // //Export to Excel
  // getXlsByDate(date, weavingUnitId, shiftId, spu) {
  //   var periodType = "date";
  //   var endpoint = `${serviceUri}/${periodType}/${date}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
  //   return super.getXls(endpoint);
  // }

  // getXlsByDateRange(startDate, endDate, weavingUnitId, shiftId, spu) {
  //   var periodType = "daterange";
  //   var endpoint = `${serviceUri}/${periodType}/start-date/${startDate}/end-date/${endDate}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
  //   return super.getXls(endpoint);
  // }

  // getXlsByMonth(month, weavingUnitId, shiftId, spu) {
  //   var periodType = "month";
  //   var endpoint = `${serviceUri}/${periodType}/${month}/unit-id/${weavingUnitId}/shift/${shiftId}/spu/${spu}`;
  //   return super.getXls(endpoint);
  // }
}
