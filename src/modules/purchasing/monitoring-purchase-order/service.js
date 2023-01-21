import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'purchase-orders/monitoring/by-user';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    // getById(id) {
    //     var endpoint = `${serviceUri}/${id}`;
    //     return super.get(endpoint);
    // }

    generateExcel(args) {
      var endpoint = `${serviceUri}/download?prNo=${args.prNo}&supplierId=${args.supplierId}&divisionCode=${args.divisionCode}&unitId=${args.unitId}&categoryId=${args.categoryId}&epoNo=${args.epoNo}&dateFrom=${args.dateFrom}&dateTo=${args.dateTo}&dateFromPO=${args.dateFromPO}&dateToPO=${args.dateToPO}&status=${args.status}&budgetId=${args.budgetId}&staff=${args.staff}`;
        return super.getXls(endpoint);
    }

}
