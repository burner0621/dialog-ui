import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = "finishing-printing/dyestuff-chemical-usage-receipt/reports";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
    }

    search(info) {
        console.log(info);
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(args) {
        let endpoint = `${serviceUri}/downloads/xls?productionOrderNo=${args.productionOrderNo}&strikeOffCode=${args.strikeOffCode}&dateFrom=${args.dateFrom}&dateTo=${args.dateTo}`
        return super.getXls(endpoint);
    }
}