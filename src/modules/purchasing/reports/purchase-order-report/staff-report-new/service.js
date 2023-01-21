import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service'; 

const serviceUri = 'purchase-orders/monitoring/staffs';
const serviceUriDetail = 'purchase-orders/monitoring/subStaffs';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  getDataStaffnoDate() {
    var endpoint = `${serviceUri}`;
    return super.get(endpoint);
  }

  getDataStaff(sdate, edate,divisi) {

 var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query == '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query == '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        
         if (divisi) {
            if (query == '') query = `divisi=${divisi}`;
            else query = `${query}&divisi=${divisi}`;
        }
        
        if (query != '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }

    getDataCoba(sdate, edate,divisi) {
 
 var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query == '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query == '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        
        if (divisi) {
            if (query == '') query = `divisi=${encodeURIComponent(divisi)}`;
            else query = `${query}&divisi=${encodeURIComponent(divisi)}`;
        }
        
        if (query != '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }


  getDetailStaffnoDate(sdate, edate,staff,divisi) {
    var endpoint = `${serviceUriDetail}?dateFrom=${sdate}&dateTo=${edate}&staff=${staff}&divisi=${divisi}`;
    return super.get(endpoint);
  }


  generateExcel2(sdate, edate,staff,divisi) {
    var endpoint = `${serviceUriDetail}?divisi=${divisi}&dateFrom=${sdate}&dateTo=${edate}&staff=${staff}`;
    return super.getXls(endpoint);
  }

 generateExcel(info) {
        var endpoint = `${serviceUriDetail}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&divisi=${info.divisi}&staff=${info.staff}`;
        return super.getXls(endpoint);
    }

  
    getDetailStaff(info) {
        var endpoint = `${serviceUriDetail}?staff=${info.staff}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&divisi=${info.divisi}`;
        return super.get(endpoint);
    }



}