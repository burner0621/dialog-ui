import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';

var moment = require('moment');

const MaterialRequestNoteLoader = require('../../../../../loader/material-request-note-loader');

@inject(Service)
export class MaterialRequestNoteItem {
    @bindable materialRequestNote;
    @bindable materialRequestCreatedDateUtc;

    columns;

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;
        this.isShowing = false;

        if (this.error && this.error.MaterialDistributionNoteDetails) {
            this.isShowing = true;
        }

        if (this.data.MaterialRequestNoteId)
            this.materialRequestNote = { Code: this.data.MaterialRequestNoteCode };

        if (this.data.MaterialRequestNoteCreatedDateUtc)
            this.materialRequestCreatedDateUtc = moment(this.data.MaterialRequestNoteCreatedDateUtc).format("DD-MMM-YYYY");

        if (this.options.isTest)
            this.columns = ["Nama Barang", "Grade", "Panjang SPB (Meter)", "Panjang Barang Datang (Meter)", "Jumlah (Pieces)", "Asal"];
        else
            this.columns = ["No SPP", "Nama Barang", "Grade", "Panjang SPB (Meter)", "Panjang Realisasi (Meter)", "Panjang Barang Datang (Meter)", "Jumlah (Piece)", "Disposisi", "Asal"];

        if (!this.readOnly)
            this.columns.push("");
        else
            this.columns.push("Status");
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    materialRequestNoteChanged(newValue, oldValue) {
        if (newValue) {
            this.service.getMaterialRequestNoteById(newValue.Id)
                .then(result => {
                    this.materialRequestCreatedDateUtc = moment(result._CreatedUtc).format("DD-MMM-YYYY");
                    let processedData = {
                        MaterialRequestNoteId: result.Id,
                        MaterialRequestNoteCode: result.Code,
                        MaterialRequestNoteCreatedDateUtc: result._CreatedUtc,
                        MaterialDistributionNoteDetails: []
                    };

                    /*
                    for (let item of result.MaterialsRequestNote_Items) {
                        let grades = item.Grade.split("");

                        for (let grade of grades) {
                            let detail = {
                                MaterialsRequestNoteItemId: item.Id,
                                ProductionOrder: item.ProductionOrder,
                                Product: item.Product,
                                MaterialRequestNoteItemLength: item.Length,
                                Grade: grade
                            };

                            processedData.MaterialDistributionNoteDetails.push(detail);
                        }
                    }
                    */

                    for (let item of result.MaterialsRequestNote_Items) {
                        let detail = {
                            MaterialsRequestNoteItemId: item.Id,
                            ProductionOrder: item.ProductionOrder,
                            Product: item.Product,
                            MaterialRequestNoteItemLength: item.Length,
                            DistributedLength: item.DistributedLength,
                            Grade: item.Grade
                        };

                        processedData.MaterialDistributionNoteDetails.push(detail);
                    }

                    Object.assign(this.data, processedData);
                    this.isShowing = true;
                });
        }
        else {
            this.data = {};
            this.materialRequestCreatedDateUtc = "";
        }
    }

    onRemove() {
        this.bind();
    }

    get materialRequestNoteLoader() {
        return MaterialRequestNoteLoader
    }
}