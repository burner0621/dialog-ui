import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "vb-realization-expeditions/reports";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getXls(info) {
    const vbId = info.vbId ? `vbId=${info.vbId}&` : "";
    const vbRealizationId = info.vbRealizationId
      ? `vbRealizationId=${info.vbRealizationId}&`
      : "";
    const vbRequestName = info.vbRequestName
      ? `vbRequestName=${info.vbRequestName}&`
      : "";
    const unitId = info.unitId ? `unitId=${info.unitId}&` : "";
    const divisionId = info.divisionId ? `divisionId=${info.divisionId}&` : "";
    const dateStart = info.dateStart ? `dateStart=${info.dateStart}&` : "";
    const dateEnd = info.dateEnd ? `dateEnd=${info.dateEnd}&` : "";
    const status = info.status ? `status=${info.status}` : "";

    const query = `?${vbId}${vbRealizationId}${vbRequestName}${unitId}${divisionId}${dateStart}${dateEnd}${status}`;

    // var query = `?vbId=${info.vbId}&vbRealizationId=${info.vbRealizationId}&vbRequestName=${info.vbRequestName}&unitId=${info.unitId}&divisionId=${info.divisionId}&dateStart=${info.dateStart}&dateEnd=${info.dateEnd}&status=${info.status}`;

    let endpoint = `${serviceUri}/xls${query}`;
    return super.getXls(endpoint);
  }
}
