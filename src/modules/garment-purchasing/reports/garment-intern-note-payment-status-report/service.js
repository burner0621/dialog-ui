
import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../utils/rest-service';


const serviceUri = 'intern-note-payment-status';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) { 
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);

        //return super.get(endpoint);
    }
    
    generateExcel(info) {
        var endpoint = `${serviceUri}/download?inno=${info.inno}&invono=${info.invono}&dono=${info.dono}&npn=${info.npn}&nph=${info.nph}&corrno=${info.corrno}&supplier=${info.supplier}&dateNIFrom=${info.dateNIFrom}&dateNITo=${info.dateNITo}&dueDateFrom=${info.dueDateFrom}&dueDateTo=${info.dueDateTo}&status=${info.status}`;
        return super.getXls(endpoint);
    }
}