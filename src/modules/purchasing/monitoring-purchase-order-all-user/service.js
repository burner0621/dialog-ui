import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'reports/purchase-monitoring/all';

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
      var endpoint = `${serviceUri}/download?unitId=${args.unitId}&categoryId=${args.categoryId}&divisionId=${args.divisionId}&budgetId=${args.budgetId}&createdBy=${args.createdBy}&status=${args.status}&startDate=${args.startDate}&endDate=${args.endDate}&startDatePO=${args.startDatePO}&endDatePO=${args.endDatePO}&supplierId=${args.supplierId}&prId=${args.prId}&poExtId=${args.poExtId}`;
        return super.getXls(endpoint);
    }

}
