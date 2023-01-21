import {
  RestService
} from "../../../utils/rest-service";
import {
  Container
} from "aurelia-dependency-injection";
import {
  Config
} from "aurelia-api";
const serviceUri = 'weaving/daily-operations-warping';

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

  getYardMeterUoms() {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("core");
    var _serviceUri = `master/uoms/simple-warping-weaving`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  // getBeamByOrderIdAndBeamType(orderId, beamType){
  //   var config = Container.instance.get(Config);
  //   var endpoint = config.getEndpoint("weaving");
  //   const resource = "weaving/daily-operations-sizing";

  //   var endpoint = `${_serviceUri}/order/${orderId}/beam-type/${beamType}`;
  //   return super.get(endpoint);
  // }

  // getBeamByOrderIdAndBeamType(orderId, beamType) {
  //   const _serviceUri = "weaving/daily-operations-sizing";
  //   var endpoint = `${_serviceUri}/order/${orderId}/beam-type/${beamType}`;
  //   return super.get(endpoint);
  // }

  updateStartProcess(Id, data) {
    const process = 'start-process';
    var endpoint = `${serviceUri}/${Id}/${process}`;
    return super.put(endpoint, data);
  }

  updateProduceBeamsProcess(Id, data) {
    const process = 'produce-beams-process';
    var endpoint = `${serviceUri}/${Id}/${process}`;
    return super.put(endpoint, data);
  }

  updateCompletedProcess(Id, data) {
    const process = 'completed-process';
    var endpoint = `${serviceUri}/${Id}/${process}`;
    return super.put(endpoint, data);
  }
  deleteHistoryStartOrCompleteStatus(Id,data){
    var status = data.HistoryStatus;
    var endpoint = `${serviceUri}/${Id}/${data.HistoryId}/${data.BeamProductId}/${status}`;
    return super.put(endpoint,data)
  }
  deleteHistoryEntryStatus(data){
    var endpoint = `${serviceUri}/${data.Id}/${data.HistoryId}`;
    return super.delete(endpoint, data);
  }
  deleteHistoryContinueOrFinishStatus(Id,data){
    var status = data.HistoryStatus;
    var endpoint = `${serviceUri}/${Id}/${data.HistoryId}/${data.BeamProductId}/${status}`;
    return super.put(endpoint, data);
  }
}
