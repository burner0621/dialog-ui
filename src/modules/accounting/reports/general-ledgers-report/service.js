import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'journal-transactions/general-ledgers';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        console.log(info);
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getXls(info) {
        let endpoint = `${serviceUri}/download/xls?startDate=${info.startDate}&endDate=${info.endDate}`;
        return super.getXls(endpoint);
    }
}