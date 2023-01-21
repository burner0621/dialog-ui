import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Config } from "aurelia-api";
import { EventAggregator } from 'aurelia-event-aggregator';

const uriPurchasingDisposition = 'purchasing-dispositions';
const uriFinanceDispositionReport = 'purchasing-disposition-report';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    getReport(info) {
        let endpoint = `${uriFinanceDispositionReport}`;
      
        return super.list(endpoint, info);
    }

    getXls(info) {
        
        var query = `?filter=${info.filter}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&dateFromPayment=${info.dateFromPayment}&dateToPayment=${info.dateToPayment}&bankExpenditureNoteNo=${info.bankExpenditureNoteNo}&SPBStatus=${info.SPBStatus}&PaymentStatus=${info.PaymentStatus}`;
        console.log(info);
        console.log(query);
        let endpoint = `${uriFinanceDispositionReport}/downloads/xls${query}`;
        return super.getXls(endpoint);
    }
}

class PurchasingService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    search(info) {
        let endpoint = `${uriPurchasingDisposition}`;
        return super.list(endpoint, info);
    }
}

export {
    Service,
    PurchasingService,
};
