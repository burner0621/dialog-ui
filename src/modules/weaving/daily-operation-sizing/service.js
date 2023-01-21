import {
  inject,
  Lazy
} from "aurelia-framework";
import {
  HttpClient
} from "aurelia-fetch-client";
import {
  RestService
} from "../../../utils/rest-service";
import {
  Container
} from "aurelia-dependency-injection";
import {
  Config
} from "aurelia-api";

const serviceUri = "weaving/daily-operations-sizing";

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

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  getUnitById(Id) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("core");
    var _serviceUri = `master/units/${Id}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  getConstructionNumberById(value) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/fabric-constructions/construction-number/${value}`;

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

  calculateNetto(emptyWeight, bruto) {
    var task = "netto";
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/daily-operations-sizing/calculate/${task}/empty-weight/${emptyWeight}/bruto/${bruto}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  calculatePISMeter(counterStart, counterFinish) {
    var task = "pis-in-meter";
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/daily-operations-sizing/calculate/${task}/start/${counterStart}/finish/${counterFinish}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  // calculatePISPieces(counterStart, counterFinish) {
  //   var task = "pis-in-pieces";
  //   var config = Container.instance.get(Config);
  //   var _endpoint = config.getEndpoint("weaving");
  //   var _serviceUri = `weaving/daily-operations-sizing/calculate/${task}/start/${counterStart}/finish/${counterFinish}`;

  //   return _endpoint.find(_serviceUri).then(result => {
  //     return result.data;
  //   });
  // }

  calculateTheoriticalKawamoto(pisMeter, yarnStrands, neReal) {
    var task = "theoritical-kawamoto";
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/daily-operations-sizing/calculate/${task}/pis/${pisMeter}/yarn-strands/${yarnStrands}/ne-real/${neReal}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  calculateTheoriticalSuckerMuller(pisMeter, yarnStrands, neReal) {
    var task = "theoritical-sucker-muller";
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/daily-operations-sizing/calculate/${task}/pis/${pisMeter}/yarn-strands/${yarnStrands}/ne-real/${neReal}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  calculateSPU(netto, theoritical) {
    var task = "spu";
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/daily-operations-sizing/calculate/${task}/netto/${netto}/theoritical/${theoritical}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  updateStart(Id, data) {
    var status = "start";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  // updatePause(Id, data) {
  //   var status = "pause";
  //   var endpoint = `${serviceUri}/${Id}/${status}`;
  //   return super.put(endpoint, data);
  // }

  // updateResume(Id, data) {
  //   var status = "resume";
  //   var endpoint = `${serviceUri}/${Id}/${status}`;
  //   return super.put(endpoint, data);
  // }

  updateProduceBeams(Id, data) {
    var status = "produce-beams";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  updateFinishDoff(Id, data) {
    var status = "finish-doff";
    var endpoint = `${serviceUri}/${Id}/${status}`;
    return super.put(endpoint, data);
  }

  deleteEntry(data) {
    var endpoint = `${serviceUri}/${data.Id}/${data.HistoryId}`;
    return super.delete(endpoint, data);
  }

  deleteStopOrContinueOrFinish(Id, data) {
    var status = data.HistoryStatus;
    var endpoint = `${serviceUri}/${Id}/${data.HistoryId}/${status}`;
    return super.put(endpoint, data);
  }

  deleteStartOrCompleted(Id, data) {
    var status = data.HistoryStatus;
    var endpoint = `${serviceUri}/${Id}/${data.HistoryId}/${data.BeamProductId}/${status}`;
    return super.put(endpoint, data);
  }

  getBeamsById(Id){
    var endpoint = `weaving/beams/${Id}`;
    return super.get(endpoint);
  }
}
