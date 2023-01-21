import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    receiptTypeOptions = ['FABRIC', 'ACCESSORIES'];

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    listDataFlag = false;

    columns = [
        { field: "ExpenditureNo", title: "Nomor Bon Keluar"},
        { 
            field: "ExpenditureDate", title: "Tanggal Bon",
            formatter: (value, data) => {
                if(moment(value).format("YYYY-MM-DD") == "0001-01-01"){
                    return "-";
                }else{
                    return moment(value).format("DD MMM YYYY");
                }
            }
        },
        { field: "UnitFrom.Name", title: "Asal"},
        { field: "ExpenditureDestination", title: "Tujuan"},
        { field: "DescriptionOfPurpose", title: "Keterangan Tujuan"},
        { field: "QtyKG", title: "Jumlah Keluar (KG)"},
        { field: "Composition", title: "Komposisi"},
        { field: "Const", title: "Konstruksi"},
        { field: "PONo", title: "Nomor PO"},
        { field: "Product.Name", title: "Nama Barang"},
        { field: "Product.Code", title: "Kode Barang"},
        { field: "Quantity", title: "Qty"},
        { field: "Uom.Unit", title: "Satuan"},
        { field: "Price", title: "Harga"},
        { field: "LocalSalesNoteNo", title: "No Nota Penjualan"},
        { field: "BCNo", title: "No BC Keluar"},
        { field: "BCType", title: "Tipe BC"},
        { 
            field: "BCDate", title: "Tgl BC",
            formatter: (value, data) => {
                if(value) {
                    if(moment(value).format("YYYY-MM-DD") == "0001-01-01"){
                        return "-";
                    }else{
                        return moment(value).format("DD MMM YYYY");
                    }
                }
                return "-";
            }
        },
    ]

    bind() {

    }

    fillValues() {
        this.arg.dateFrom = this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "";
        this.arg.dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";
        this.arg.receiptType= this.receiptType;
    }

    loader = (info) => {
        var order = {};

        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        };

        return this.listDataFlag ? (
            this.fillValues(),
            this.service.search(this.arg)
                .then(result => {
                    return {
                        total: result.info.total,
                        data: result.data
                    }
                })
        ) : { total: 0, data: {} };
    }

    search() {
        this.listDataFlag = true;
        this.movementTable.refresh();
    }

    reset() {
        this.receiptType = this.receiptTypeOptions[0];
        this.dateFrom = null;
        this.dateTo = null;
        this.listDataFlag = false;
        this.movementTable.refresh();
    }

    ExportToExcel() {
        this.fillValues();
        this.service.generateExcel(this.arg);
    }

}