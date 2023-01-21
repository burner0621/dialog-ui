import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'unit-receipt-notes/monitoring';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

search(no,pr, unit,supplier, purchaseRequestRefNo, roNo, deliveryorderNo, dateFrom, dateTo) { 
     
        var endpoint = `${serviceUri}?no=${no}&pr=${pr}&unit=${unit}&supplier=${supplier}&purchaseRequestRefNo=${purchaseRequestRefNo}&roNo=${roNo}&deliveryorderNo=${deliveryorderNo}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.get(endpoint);
    }

generateXls(no,pr, unit,supplier, purchaseRequestRefNo, roNo, deliveryorderNo, dateFrom, dateTo) { 
       console.log(supplier);
        var endpoint = `${serviceUri}?no=${no}&pr=${pr}&unit=${unit}&supplier=${supplier}&purchaseRequestRefNo=${purchaseRequestRefNo}&roNo=${roNo}&deliveryorderNo=${deliveryorderNo}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        return super.getXls(endpoint);
    }
}
