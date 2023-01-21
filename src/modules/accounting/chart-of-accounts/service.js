import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service'; 

const serviceUri = "master/chart-of-accounts";
 
export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  searchAll(info) {
    var endpoint = `${serviceUri}/all`;
    return super.list(endpoint, info);
  }

  searchHeader(info) {
    var endpoint = `${serviceUri}/header`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getByCode(code) {
    var endpoint = `${serviceUri}?keyword=${code}`;
    return super.get(endpoint);
  }


}
