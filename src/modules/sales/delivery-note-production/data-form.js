import { inject, bindable, computedFrom, containerless } from 'aurelia-framework';
import { Service } from './service';
import moment from 'moment';

const SalesContractSpinningLoader = require('../../../loader/spinning-sales-contract-loader');

@containerless()
@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    @bindable selectedSalesContract;
    @bindable total;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    ListUnit = ["", "Spinning 1 Bp. Puthut Ika Margana", "Spinning 2 Bp. Tulus Basuki W", "Spinning 3 Bp. Karyono",];
    ListSubject = ["", "Order Jual", "Lainnya",];
    ListMonth = ["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember",];
    ListYear = ["","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030"];


    constructor(service) {
        this.service = service;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        this.hasPosting = this.context.hasPosting;


        var salesContract = this.data.SalesContract;
        if (salesContract) {
            this.selectedSalesContract = await this.service.getSalesContractById(salesContract.Id);
            // this.selectedSalesContractDetail = await this.service.getByIdSales(salesContract.Id);
            // console.log(this.selectedSalesContractDetail);
        } else {
            this.selectedSalesContract = this.data.SalesContract;
        }
    }

    get SalesContractSpinningLoader() {
        
        return SalesContractSpinningLoader;
    }

    enterDelegate(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            return false;
        } else return true;
    }
}
