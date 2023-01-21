import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';

const dealTrackingReasonUri = 'deal-tracking-reasons';

export class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "deal-tracking");
    }

    /* Deal Tracking Reason */
    searchDealTrackingReason(info) {
        var endpoint = `${dealTrackingReasonUri}`;
        return super.list(endpoint, info);
    }
}