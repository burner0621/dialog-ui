import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import numeral from 'numeral';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
        {
            field: "Date", title: "Tanggal", formatter: function (value, data, index) {
                return moment.utc(value).local().format('DD MMM YYYY');
            },
        },
        { field: "ProcessType", title: "Jenis Proses" },
        { field: "MaterialType.Name", title: "Jenis Material" },
        { field: "Lot.LotNo", title: "Lot" },
        { field: "Shift", title: "Shift" },
        { field: "UnitDepartment.Name", title: "Unit" },
        {
            field: "TotalBale", title: "Total Bale (Nett)", formatter: function (value, data, index) {
                return numeral(value).format('0,000.0000');
            }
        },
        {
            field: "TotalEff", title: "%Eff (Nett)", formatter: function (value, data, index) {
                return numeral(value).format('0,000.0000');
            }
        },
        { field: "MachineNo", title: "No Mesin" },
        { field: "MachineName", title: "Merk Mesin" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            filter: JSON.stringify({ "ProcessType": "Blowing" })
        }

        return this.service.search(arg)
            .then(result => {
                for(var data of result.data){
                    data.TotalBale = data.Items[0].Bale;
                    data.TotalEff = data.Items[0].Eff;
                    data.MachineNo = data.Items[0].MachineSpinning.No;
                    data.MachineName = data.Items[0].MachineSpinning.Name;
                }
               
                return {
                    total: result.info.count,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
