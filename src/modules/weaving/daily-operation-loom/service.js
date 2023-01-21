import {
  RestService
} from "../../../utils/rest-service";
import {
  Container
} from "aurelia-dependency-injection";
import {
  Config
} from "aurelia-api";
const serviceUri = 'weaving/daily-operations-loom';

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(Id) {
    var endpoint = `${serviceUri}/${Id}`;
    return super.get(endpoint);
  }

  getUnitById(Id) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("core");
    var _serviceUri = `master/units/${Id}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  getConstructionNumberById(Id) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/fabric-constructions/construction-number/${Id}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  getSupplierById(Id) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/suppliers/get-code/${Id}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  getShiftByTime(value) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/shifts/check-shift/${value}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  getOperatorById(value) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/operators/${value}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  updateStart(Id, data) {
    const process = 'start';
    var endpoint = `${serviceUri}/${Id}/${process}`;
    return super.put(endpoint, data);
  }

  updateReprocess(Id, data) {
    const process = 'reprocess';
    var endpoint = `${serviceUri}/${Id}/${process}`;
    return super.put(endpoint, data);
  }

  updateProduceGreige(Id, data) {
    const process = 'produce-greige';
    var endpoint = `${serviceUri}/${Id}/${process}`;
    return super.put(endpoint, data);
  }

  // updatePause(Id, data) {
  //   const process = 'pause';
  //   var endpoint = `${serviceUri}/${Id}/${process}`;
  //   return super.put(endpoint, data);
  // }

  // updateResume(Id, data) {
  //   const process = 'resume';
  //   var endpoint = `${serviceUri}/${Id}/${process}`;
  //   return super.put(endpoint, data);
  // }
}
