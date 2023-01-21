import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUriPreparing = 'garment-sample-preparings';
const serviceUriCuttingIn= 'garment-sample-cutting-ins';
const serviceUriCuttingOut= 'garment-sample-cutting-outs';
const serviceUriSewingIn = 'garment-sample-sewing-ins';
const serviceUriSewingOut = 'garment-sample-sewing-outs';
const serviceUriFinishingIn = 'garment-sample-finishing-ins';
const serviceUriFinishingOut = 'garment-sample-finishing-outs';
const serviceUriExpenditure = 'garment-sample-expenditure-goods';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    searchPreparing(info) {
        var endpoint = `${serviceUriPreparing}`;
        return super.list(endpoint, info);
    }

    searchCuttingIn(info) {
        var endpoint = `${serviceUriCuttingIn}`;
        return super.list(endpoint, info);
    }

    searchCuttingOut(info) {
        var endpoint = `${serviceUriCuttingOut}`;
        return super.list(endpoint, info);
    }

    searchSewingIn(info) {
        var endpoint = `${serviceUriSewingIn}`;
        return super.list(endpoint, info);
    }

    searchSewingOut(info) {
        var endpoint = `${serviceUriSewingOut}`;
        return super.list(endpoint, info);
    }

    searchFinishingIn(info) {
        var endpoint = `${serviceUriFinishingIn}`;
        return super.list(endpoint, info);
    }
    
    searchFinishingOut(info) {
        var endpoint = `${serviceUriFinishingOut}`;
        return super.list(endpoint, info);
    }

    searchExpenditure(info) {
        var endpoint = `${serviceUriExpenditure}`;
        return super.list(endpoint, info);
    }

    updateDate(data,type) {
        var uri="";
        if (type=="PREPARING"){
            uri= serviceUriPreparing;
        }
        else if(type=="CUTTING IN"){
            uri=serviceUriCuttingIn;
        }
        else if(type=="CUTTING OUT"){
            uri=serviceUriCuttingOut;
        }
        else if(type=="SEWING IN"){
            uri=serviceUriSewingIn;
        }
        else if(type=="SEWING OUT"){
            uri=serviceUriSewingOut;
        }
        else if(type=="FINISHING IN"){
            uri=serviceUriFinishingIn;
        }
        else if(type=="FINISHING OUT"){
            uri=serviceUriFinishingOut;
        }
        else if(type=="PENGELUARAN GUDANG JADI"){
            uri=serviceUriExpenditure;
        }
        var endpoint = `${uri}/update-dates`;
        return super.put(endpoint, data);
    }

    
}

const UnitServiceUri = 'master/units';
export class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getSampleUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }
}