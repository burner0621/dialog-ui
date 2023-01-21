import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "journal-transactions";
const subLedgerReportServiceUri = 'journal-transactions/report/sub-ledgers';

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "finance");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        let endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getRealizationByReferenceNo(referenceNo) {
        let endpoint = `vb-realization-documents/by-reference-no/${referenceNo}`;
        return super.get(endpoint);
    }

    getPdfById(id) {
        let endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
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

    posting(data) {
        let endpoint = `${serviceUri}/posting-transaction/${data.Id}`;
        return super.put(endpoint);
    }

    postingUpdateCOA(data) {
        let endpoint = `${serviceUri}/posting-transaction-update-coa/${data.Id}`;
        return super.put(endpoint, data);
    }

    getMonths() {
        let endpoint = `${subLedgerReportServiceUri}/options/months`;
        return super.list(endpoint);
    }

    getUnpostedTransactions(month, year, referenceNo, referenceType) {
        let endpoint = `${serviceUri}/unposted-transactions?month=${month}&year=${year}&referenceNo=${referenceNo}&referenceType=${referenceType}&isVB=${true}&test=`;
        return super.list(endpoint);
    }
}
