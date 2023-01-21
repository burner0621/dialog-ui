import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = 'payment-disposition-note';
const ExpeditionServiceUri = 'purchasing-disposition-expeditions';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getPdfById(id) {
        let endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    searchDispoEx(info) {
        let endpoint = `${ExpeditionServiceUri}`;
        return super.list(endpoint, info);
    }

    post(data) {
        var endpoint = `${serviceUri}/post`;
        return super.put(endpoint, data);
    }

    searchAllByPosition(info) {
      let endpoint = `${serviceUri}/get-expedition/by-position`;
      return super.list(endpoint, info);
  }

    // createCreditorAccount(creditorAccounts) {
    //     var config = Container.instance.get(Config);
    //     var endpoint = config.getEndpoint("finance");
    //     const resource = "creditor-account/bank-expenditure-note/list"
    //     return endpoint.post(resource, creditorAccounts);
    // }

    // updateCreditorAccount(creditorAccounts) {
    //     var config = Container.instance.get(Config);
    //     var endpoint = config.getEndpoint("finance");
    //     const resource = "creditor-account/bank-expenditure-note/list"
    //     return endpoint.update(resource, null, creditorAccounts);
    // }
}

export default Service;
