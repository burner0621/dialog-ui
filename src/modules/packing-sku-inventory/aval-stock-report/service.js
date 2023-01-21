import { RestService } from '../../../utils/rest-service';
const serviceUri = 'aval-stock-report';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(date) {
        var endpoint = `${serviceUri}/xls?searchDate=${date}`;

        return super.getXls(endpoint);
    }
}