import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    selectedItem = [];
    context = ["Rincian","Cetak PDF"];
    columns = [
        {
            field: "postedItem", checkbox: true, sortable: false,
            formatter: (value, data) => {
                return { disabled: data.IsPosted, }
            }
        },
        { field: "DONo", title: "Nomor DO" },
        {
            field: "DODate", title: "Tanggal DO", formatter: value => moment(value).format("DD MMM YYYY")
        },
        { field: "SupplierName", title: "Unit Pengirim" },

        {
            field: "items", title: "List Nomor Eksternal TO",
            formatter: items => {
                items = items.map(item => "&#9679; " + item.ETONo);
                return items.join("<br>");
            },
            sortable: false
        },
        { field: "IsPosted", title: "Status Post", formatter: value => { return value ? "SUDAH" : "BELUM" } },
    ];

    constructor(router, service) {
        this.service = service;
        this.router = router;
        
    }

    rowFormatter(data, index) {
        return data.IsPosted ? { classes: "success" } : {};
    }
    
    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                console.log(result);
                for (var data of result.data) {
                    console.log(data);
                    data.SupplierName = data.name;
                }
                console.log(result);
                return {
                    total: result.info.total,
                    data: result.data,
                    
                }
                
            });
    }

    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak PDF":
                return data.IsPosted;
            default:
                return true;
        }
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
            case "Cetak PDF":
                this.service.pdf(data);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    post() {
        var idPostItems = this.selectedItem.map(value => value.Id);
        if (idPostItems.length > 0) {
            this.service.post(idPostItems).then(result => {
                this.table.refresh();
                this.selectedItem = [];
            }).catch(e => {
                this.error = e;
            })
        }
    }
}