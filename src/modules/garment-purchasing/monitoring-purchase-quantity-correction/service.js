import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'purchase-quantity-correction/monitoring';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

search(no,supplier, dateFrom, dateTo) { 
    
         var endpoint = `${serviceUri}?no=${no}&supplier=${supplier}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
       
        return super.get(endpoint);
    }

generateXls(no,supplier, dateFrom, dateTo) { 
       var endpoint = `${serviceUri}?no=${no}&supplier=${supplier}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.getXls(endpoint);
    }
}
