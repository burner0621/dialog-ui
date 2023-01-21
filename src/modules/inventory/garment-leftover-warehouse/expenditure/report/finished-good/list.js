import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

@inject(Service)

export class List {
    constructor(service) {
        this.service = service;

        this.flag = false;
        this.error = {};
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    columns = [
        { field: "index", title: "No", sortable: false, width: '2%' },
        { field: "FinishedGoodExpenditureNo", title: "No Bon Keluar", sortable: false, width: '5%' },
        {
            field: "ExpenditureDate", title: "Tgl Bon ", formatter: function (value, data, index) {
                if(moment(value).format("YYYY-MM-DD") == "0001-01-01"){
                    return "-";
                }else{
                    return moment(value).format("DD MMM YYYY");
                }
            }, width: '5%'
        },
        { field: "UnitFrom.Code", title: "Unit Asal", sortable: false, width: '3%' },
        { field: "ExpenditureTo", title: "Tujuan", sortable: false, width: '5%' },
        { field: "ExpenditureDestinationDesc", title: "Keterangan Tujuan", sortable: false, width: '15%' },
        { field: "RONo", title: "RO", sortable: false, width: '5%' },
        { field: "UnitComodityCode", title: "Kode Komoditi Unit", sortable: false, width: '10%' },
        { field: "LeftoverComodityCode", title: "Kode Komoditi", sortable: false, width: '10%' },
        { field: "LeftoverComodityName", title: "Komoditi", sortable: false, width: '10%' },
        { field: "ExpenditureQuantity", title: "Quantity", sortable: false, width: '5%' },
        { field: "Uom", title: "Satuan", sortable: false, width: '3%'},
        { field: "Consignment", title: "Titip Jual", sortable: false, width: '3%'},
       { field: "LocalSalesNoteNo", title: "No Nota Penjualan " , sortable: false, width: '10%'},
        
    ];

    search() {
        this.error = {};

        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.mdnTable.refresh();
        }
    }

    reset() {
        this.dateTo = undefined;
        this.dateFrom = undefined;
        this.error = {};

        this.flag = false;
        this.mdnTable.refresh();
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            order: order,
            dateFrom: moment(this.dateFrom).format("MM/DD/YYYY"),
            dateTo:moment(this.dateTo).format("MM/DD/YYYY")
        };

        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        result.data.forEach(s=>{
                            if(s.index == 0){
                                s.index = "";
                            }
                        })
                        return {
                            total: result.info.total,
                            data: result.data
                        };
                    })
            ) : { total: 0, data: [] };
    }

    XLS() {
        let args = {
           
            dateFrom: moment(this.dateFrom).format("MM/DD/YYYY"),
            dateTo:moment(this.dateTo).format("MM/DD/YYYY")
        };
        this.service.xls(args);
    }

   
}
