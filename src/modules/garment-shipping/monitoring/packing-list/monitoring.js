import { inject } from 'aurelia-framework'
import { Service } from "./service";
import moment from 'moment';

const BuyerLoader = require('../../../../loader/garment-buyers-loader');

@inject(Service)
export class Monitoring {
    constructor(service) {
        this.service = service;
    }

    controlOptions = {
        label: { length: 4 },
        control: { length: 3 }
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    buyerView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`
    }

    invoiceTypeOptions = ["", "DL", "SM"];

    tableOptions = {
        pagination: false,
        search: false,
        showToggle: false,
        showColumns: false
    }

    columns = [
        { field: "invoiceNo", title: "No<br>Invoice", sortable: false },
        {
            field: "date", title: "Tanggal<br>Packing<br>List", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }, sortable: false
        },
        { field: "buyerAgentCode", title: "Buyer Agent", sortable: false },
        { field: "sectionCode", title: "Seksi", sortable: false },
        {
            field: "truckingDate", title: "Tanggal<br>Trucking", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }, sortable: false
        },
        {
            field: "exportEstimationDate", title: "Tanggal<br>Perkiraan<br>Export", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }, sortable: false
        },
        { field: "destination", title: "Destination", sortable: false },
        { field: "lcNo", title: "LC No", sortable: false },
        { field: "issuedBy", title: "Issued By", sortable: false },
        { field: "grossWeight", title: "Gross<br>Weight", sortable: false },
        { field: "nettWeight", title: "Nett<br>Weight", sortable: false },
        { field: "totalCarton", title: "Total<br>Carton", sortable: false },
    ]

    get filter() {
        return {
            buyerAgentId: (this.selectedBuyer || {}).Id,
            buyerAgent: (this.selectedBuyer || {}).Code,
            invoiceType: this.selectedInvoiceType,
            dateFrom: this.selectedDateFrom ? this.selectedDateFrom.toJSON() : null,
            dateTo: this.selectedDateTo ? this.selectedDateTo.toJSON() : null,
        };
    }

    loader = (info) => {
        const arg = Object.assign({}, this.filter);

        return this.listDataFlag ? (
            this.service.search(arg)
                .then(result => {
                    for (const data of result.data) {
                        data.buyerAgentCode = `${data.buyerAgentCode} - ${data.buyerAgentName}`;
                    }
                    return {
                        total: result.info.total,
                        data: result.data,
                    }
                })
        ) : { total: 0, data: [] };
    }

    search() {
        this.listDataFlag = true;
        this.table.refresh();
    }

    reset() {
        this.selectedBuyer = null;
        this.selectedInvoiceType = "";
        this.selectedDateFrom = null;
        this.selectedDateTo = null;

        this.listDataFlag = false;
        this.table.refresh();
    }

    xls() {
        this.service.xls(this.filter);
    }
}