import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'production/kanbans/reports';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
    }

    getReport(sdate, edate, orderNo, orderType, processType, proses) {
        var endpoint = `${serviceUri}`;
        var query = '';
        
        if (sdate) {
            if (query === '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (orderNo && orderNo !== '') {
            if (query === '') query = `orderNo=${orderNo}`;
            else query = `${query}&orderNo=${orderNo}`;
        }
        if (orderType) {
            if (query === '') query = `orderTypeId=${orderType.Id}`;
            else query = `${query}&orderTypeId=${orderType.Id}`;
        }
        if (processType) {
            if (query === '') query = `processTypeId=${processType.Id}`;
            else query = `${query}&processTypeId=${processType.Id}`;
        }
		 if (proses && proses !== '') {
             
            if(proses == 'Ya')
                proses = true;
            else if(proses == 'Tidak')
                proses = false;

            if (query === '') query = `proses=${proses}`;
            else query = `${query}&proses=${proses}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }

    generateExcel(sdate, edate, orderNo, orderType, processType,proses) {
        var endpoint = `${serviceUri}/downloads/xls`;
        var query = '';
        if (sdate) {
            if (query === '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (orderNo) {
            if (query === '') query = `orderNo=${orderNo}`;
            else query = `${query}&orderNo=${orderNo}`;
        }
        if (orderType) {
            if (query === '') query = `orderTypeId=${orderType._id}`;
            else query = `${query}&orderTypeId=${orderType._id}`;
        }
        if (processType) {
            if (query === '') query = `processTypeId=${processType._id}`;
            else query = `${query}&processTypeId=${processType._id}`;
        }
        	 if (proses && proses !== '') {
            if (query === '') query = `proses=${proses}`;
            else query = `${query}&proses=${proses}`;
        }
        if (query !== '')
            endpoint = `${endpoint}?${query}`;

        return super.getXls(endpoint);
    }
}