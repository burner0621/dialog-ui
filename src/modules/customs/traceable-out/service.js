
import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


// const serviceUri = 'customs-reports';
const serviceUri = 'traceable';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        // super(http, aggregator, config, "customs-report");
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) { 
        console.log(info);
        var endpoint = `${serviceUri}/out`;
        return super.list(endpoint, info);

        //return super.get(endpoint);
    }

    search2(ro) { 
        var endpoint = `${serviceUri}/out/detail?ro=${ro}`;
        return super.get(endpoint);

        //return super.get(endpoint);
    }
    
    generateExcel(info) {
        // console.log(info);
        var endpoint = `${serviceUri}/out/download?bcno=${info.bcno}`;
        return super.getXls(endpoint);
    }
}