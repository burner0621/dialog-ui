import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'finishing-printing/daily-monitoring-event';
const serviceUriEventOrganizer = 'master/event-organizer';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "production-azure");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    let endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    let endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  update(data) {
    let endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    let endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getByAreaAndGroup(info) {
    let endpoint = `${serviceUriEventOrganizer}/group-area?area=${info.area}&group=${info.group}`;
    return super.get(endpoint);
  }


}