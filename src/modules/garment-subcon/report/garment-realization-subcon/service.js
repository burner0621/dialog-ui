import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'subcon-contracts/realization-report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

search(info) { 
    var endpoint = `${serviceUri}?subconcontractNo=${info.subconcontractNo}`;
    return super.get(endpoint);
    
}
    
generateExcel(info) {
       var endpoint = `${serviceUri}/download?subconcontractNo=${info.subconcontractNo}`;
       return super.getXls(endpoint);
    }

}