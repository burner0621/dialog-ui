import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }

    searching() {
        var info = {
            categoryName: this.category ? this.category : "",

            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
            unit: this.unit ? this.unit.Id : "",
        }
        this.service.search(info)
            .then(result => {
                this.data = [];
                for (var _data of result.data) {
                    //_data.QtyOrder = _data.QtyOrder.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.ProductCode = _data.ProductCode;
                    _data.ProductName = _data.ProductName;
                    _data.UomUnit = _data.UomUnit;
                    _data.UnitName = _data.UnitName;
                    _data.QuantityReceipt = _data.QuantityReceipt.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.PriceReceipt = _data.PriceReceipt.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.BeginingBalanceQuantity = _data.BeginingbalanceQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.BeginingBalancePrice = _data.BeginingbalancePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.QuantityUnitExpend = _data.QuantityUnitExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.PriceUnitExpend = _data.PriceUnitExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.QuantitySampleExpend = _data.QuantitySampleExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.PriceSampleExpend = _data.PriceSampleExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.QuantityLocalExpend = _data.QuantityLocalExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.PriceLocalExpend = _data.PriceLocalExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.QuantityOtherExpend = _data.QuantityOtherExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.PriceOtherExpend = _data.PriceOtherExpend.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.EndBalanceQuantity = _data.EndbalanceQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.EndBalancePrice = _data.EndbalancePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    this.data.push(_data);
                }
                this.fillTable();

            });
    }

    rowFormatter(data, index) {
        if (data.UnitName.includes("TOTAL"))
            return { css: { "font-weight": "bold" } };
        else
            return {};
    }


    fillTable() {
        const columns = [
            [
                {
                    field: "UnitName", rowspan: "2", title: "ASAL",
                    cellStyle: (value, row, index, field) => {
                        if (value.includes("TOTAL")) {
                            return { css: { "background": "transparent", "font-weight": "bold", "text-align": "center", "vertical-align": "top" } };
                        }
                        return { css: { "background": "transparent", "text-align": "center", "vertical-align": "top" } };
                    },
                },
                {
                    field: "ProductName", rowspan: "2", title: "NAMA BARANG",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent", "text-align": "center", "vertical-align": "top" } };
                    },
                },
                {
                    field: "ProductCode", rowspan: "2", title: "KODE BARANG",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent", "text-align": "center", "vertical-align": "top" } };
                    },
                },
                {
                    field: "UomUnit", rowspan: "2", title: "SATUAN",
                    cellStyle: (value, row, index, field) => {
                        return { css: { "background": "transparent", "text-align": "right", "vertical-align": "top" } };
                    },
                },
                { colspan: "2", title: "SALDO AWAL" },
                { colspan: "2", title: "TERIMA" },
                { colspan: "2", title: "U / UNIT" },
                { colspan: "2", title: "U / SAMPLE" },
                { colspan: "2", title: "U / JUAL LOKAL" },
                { colspan: "2", title: "U / LAIN-LAIN" },
                { colspan: "2", title: "SALDO AKHIR" },
            ],
            [
                {
                    field: 'BeginingBalanceQuantity', title: 'Qty', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'BeginingBalancePrice', title: 'Harga', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'QuantityReceipt', title: 'Qty', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'PriceReceipt', title: 'Harga', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'QuantityUnitExpend', title: 'Qty', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'PriceUnitExpend', title: 'Harga', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'QuantitySampleExpend', title: 'Qty', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'PriceSampleExpend', title: 'Harga', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'QuantityLocalExpend', title: 'Qty', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'PriceLocalExpend', title: 'Harga', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'QuantityOtherExpend', title: 'Qty', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'PriceOtherExpend', title: 'Harga', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'EndBalanceQuantity', title: 'Qty', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
                {
                    field: 'EndBalancePrice', title: 'Harga', cellStyle: (value, row, index, field) => {
                        return { css: { "text-align": "right" } }
                    }
                },
            ]];

        var bootstrapTableOptions = {
            undefinedText: '',
            columns: columns,
            data: this.data,
            rowStyle: this.rowFormatter
        };

        bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
        $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);

        for (const rowIndex in this.data) {
            if (this.data[rowIndex].UnitName.includes("TOTAL")) {
                var rowSpan = this.data[rowIndex].row_count;
                //$(this.table).bootstrapTable('mergeCells', { index: rowIndex, field: "UnitName", colspan: 4 });

            }

        }

    }


    ExportToExcel() {
        var info = {
            categoryName: this.category ? this.category : "",

            dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
            unit: this.unit ? this.unit.Id : "",

        }
        this.service.xls(info);
    }

    get unitLoader() {
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;

    }
    @bindable category;

    categoryItems = ['FABRIC', 'ACCESSORIES', 'BARANG JADI']
    categoryChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "FABRIC") {

                this.categoryname = "FABRIC";
            }
            else if (newvalue === "ACCESSORIES") {

                this.categoryname = "ACCESSORIES";
            }
            else if (newvalue === "BARANG JADI") {

                this.categoryname = "BARANG JADI";
            }
        } else {
            this.unit = "";
            this.unitname = "";
        }
    }
    reset() {
        this.categoryName = null;
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
        this.unitname = "";
    }
}