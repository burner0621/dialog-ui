import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const machineServiceUri = 'master/machines';
const stepServiceUri = 'master/steps';

export class ServiceCore extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "core");
  }

  machine(info) {
    var endpoint = `${machineServiceUri}`;
    return super.list(endpoint, info);
  }

  step(info) {
    var endpoint = `${stepServiceUri}`;
    return super.list(endpoint, info);
  }
}