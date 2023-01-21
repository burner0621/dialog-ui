import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from './service';
import { VBRealizationService } from './vb-realization-service';
import moment from 'moment';

var VBRealizationLoader = require('./loader/vb-verification-loader');

@inject(Service, VBRealizationService)
export class DataForm {
    @bindable title;
    @bindable readOnly;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    filter = {
        "Position": 3
    }

    get vbRealizationLoader() {
        return VBRealizationLoader;
    }

    constructor(service, vbRealizationService) {
        this.service = service;
        this.vbRealizationService = vbRealizationService;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
        this.isCreate = this.context.isCreate;

        if (this.data.vbRealization) {
            this.isVerified = (this.data.vbRealization.Header.Position == 4) ? true : false;
            this.isRejected = (this.data.vbRealization.Header.Position == 6) ? true : false;

            this.selectedVBRealization = this.data.vbRealization.Header
            this.vbHeaderOptions = {
                vbRequestDocumentAmount: this.data.vbRealization.Header.VBRequestDocumentAmount,
                vbType: this.data.vbRealization.Header.Type
            };

            if (this.data.vbRealization.Header.Type == 1) {
                this.columns = [
                    "Tanggal",
                    "No SPB",
                    "Harga",
                    "Kena PPn",
                    "Total"
                ];
            } else {
                this.columns = [
                    "Tanggal",
                    "Keterangan",
                    "Harga",
                    "Kena PPn",
                    "Total"
                ];
            }
        }

    }

    vbHeaderOptions = {

    }

    columns = [
        "Tanggal",
        "Keterangan",
        "Harga",
        "Kena PPn",
        "Total"
    ]

    get addItems() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    @bindable selectedVBRealization;
    vbType = "";
    isVB = false;
    async selectedVBRealizationChanged(newValue, oldValue) {
        if (newValue) {
            this.data.vbRealization = await this.vbRealizationService.getById(newValue.Id);
            this.vbType = this.data.vbRealization.Header.Type == 1 ? 'Dengan PO' : 'Non PO';
            this.isVB = this.data.vbRealization.Header.VBRequestDocumentId > 0;
            if (this.data.vbRealization.Header.Type == 1) {
                this.columns = [
                    "Tanggal",
                    "No SPB",
                    "Harga",
                    "PPn",
                    "PPh",
                    "PPh Ditanggung",
                    "Total"
                ];
            } else {
                this.columns = [
                    "Tanggal",
                    "Keterangan",
                    "Harga",
                    "PPn",
                    "PPh",
                    "PPh Ditanggung",
                    "Total"
                ];
            }

            this.vbHeaderOptions = {
                vbRequestDocumentAmount: this.data.vbRealization.Header.VBRequestDocumentAmount,
                vbType: this.data.vbRealization.Header.Type
            };
        } else {
            this.data.vbRealization.Header.Id = 0;
        }
    }
}