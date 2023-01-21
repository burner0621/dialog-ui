import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service'; 

const serviceUri = 'unit-spb-notes/monitoring';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    // search(info) {
    //     var endpoint = `${serviceUri}?no=${no}&PRNo=${PRNo}&unitId=${unitId}&categoryId=${categoryId}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    //     return super.get(endpoint);
    // }
    search(info) {
        console.log(info);
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
        
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    
   generateExcel(info) {
    console.log(info);
        var endpoint = `${serviceUri}/download?urnNo=${info.UrnNo}&supplierName=${info.SupplierName}&doNo=${info.DONo}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        
        return super.getXls(endpoint);
        
    }

}
