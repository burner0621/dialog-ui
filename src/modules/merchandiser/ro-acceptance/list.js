import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

import moment from 'moment';
@inject(Router, Service)
export class List {
    // context = ["Rincian"];
    columns = [
        { field: "Section", title: "Seksi" },
        
        { field: "RO_Number", title: "No RO" },
        { field: "BuyerCode", title: "Kode Agent" },
        { field: "BuyerName", title: "Nama Buyer Agent" },
        { field: "BrandCode", title: "Kode Brand" },
        { field: "BrandName", title: "Nama Buyer Brand" },
        { field: "Article", title: "Artikel" },
        { field: "UnitName", title: "Unit" },
        { field: "Quantity", title: "Kuantitas Order" },
        { field: "UOMUnit", title: "Satuan" },
        { field: "ROAcceptedDate", title: "Tgl. Penerimaan RO", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "ROAcceptedBy", title: "Penerima RO"},
    ];

    loader = (info) => {
        let order = {};
        if (info.sort) {
          order[info.sort] = info.order;
        }
        let filter = {};
        filter["IsROAccepted == true"] = true;
        let arg = {
          page: parseInt(info.offset / info.limit, 10) + 1,
          size: info.limit,
          keyword: info.search,
          // select: ["PRNo", "RONo", "ShipmentDate", "Buyer.Name", "Unit.Name", "IsPosted"],
          order: order,
          filter: JSON.stringify(filter)
        }

        return this.service.search(arg)
        .then(result => {
            result.data.forEach(data => {
            data.BuyerCode = data.Buyer.Code;
            data.BuyerName = data.Buyer.Name;
            data.BrandCode = data.BuyerBrand.Code;
            data.BrandName = data.BuyerBrand.Name;  
            data.UOMUnit = data.UOM.Unit;
            });
            return {
            total: result.info.total,
            data: result.data
            }
        });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    // contextCallback(event) {
    //     var arg = event.detail;
    //     var data = arg.data;
    //     switch (arg.name) {
    //         case "Rincian":
    //             this.router.navigateToRoute('view', { id: data.Id });
    //             break;
    //     }
    // }

    create() {
        this.router.navigateToRoute('create');
    }
}