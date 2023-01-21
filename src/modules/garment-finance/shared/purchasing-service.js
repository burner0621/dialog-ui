import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


export class PurchasingService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    getInternalNoteById(id) {
        var endpoint = `garment-intern-notes/${id}`;
        return super.get(endpoint);
    }

    getDispositionNoteById(id) {
        var endpoint = `garment-disposition-purchase/${id}`;
        return super.get(endpoint);
    }

    getDispositionNoteByIdVerifiedCalculated(id) {
        var endpoint = `garment-disposition-purchase/${id}?isVerifiedAmountCalculated=true`;
        return super.get(endpoint);
    }

    getDispositionNoteByIdVerifiedNotCalculated(id) {
        var endpoint = `garment-disposition-purchase/${id}?isVerifiedAmountCalculated=false`;
        return super.get(endpoint);
    }
}
