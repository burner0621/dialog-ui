import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUri = 'garment-sample-expenditure-goods'; 
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}/archive-monitoring`;
        var query = '';

        if (info.type && info.type !== "") {
            if (query === '') query = `type=${info.type}`;
            else query = `${query}&type=${info.type}`;
        }
        if (info.roNo && info.roNo !== "") {
            if (query === '') query = `roNo=${info.roNo}`;
            else query = `${query}&roNo=${info.roNo}`;
        }
        if (info.comodity && info.comodity !== "") {
            if (query === '') query = `comodity=${info.comodity}`;
            else query = `${query}&comodity=${info.comodity}`;
        }
        if (query !== '')
        endpoint = `${serviceUri}/archive-monitoring?${query}`;

    return super.get(endpoint);

      
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/archive-download?type=${info.type}&roNo=${info.roNo}&comodity=${info.comodity}`;
        console.log(endpoint);
        var query = '';
        if (info.type && info.type !== "") {
            if (query === '') query = `type=${info.type}`;
            else query = `${query}&type=${info.type}`;
        }
        if (info.roNo && info.roNo !== "") {
            if (query === '') query = `roNo=${info.roNo}`;
            else query = `${query}&roNo=${info.roNo}`;
        }
        if (info.comodity && info.comodity !== "") {
            if (query === '') query = `comodity=${info.comodity}`;
            else query = `${query}&comodity=${info.comodity}`;
        }
        if (query !== '')
        endpoint = `${serviceUri}/archive-download?${query}`;

    return super.getXls(endpoint);
    }
}
