import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-disposition-expeditions/report";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getXls(info) {
    let endpoint = `${serviceUri}/xls?dispositionId=${info.dispositionId}&epoId=${info.epoId}&supplierId=${info.supplierId}&startDate=${info.startDate}&endDate=${info.endDate}&purchasingStaff=${info.purchasingStaff}&position=${info.position}`;
    return super.getXls(endpoint);
  }

  getPosition() {
    let endpoint = `${serviceUri}/position-options`;
    return super.list(endpoint);
  }
}
