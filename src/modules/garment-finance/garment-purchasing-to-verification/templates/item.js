import { bindable, inject, computedFrom } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from '../service';
const InternalNoteLoader = require('../../shared/internal-note-loader');

@inject(Service)
export class Item {
    @bindable unitPaymentOrder;

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.checkExist = {

        }

        for (var item of this.context.context.items) {

            if (Object.keys(item.data).length && item.data.InternalNote != null) {
                let documentNoData = item.data.InternalNote.DocumentNo;
                if (!(documentNoData == undefined)) {
                    this.checkExist[`${documentNoData}`] = false;
                }
            }

        }

        this.context.checkExist = this.checkExist;

    }


    toggle() {
        this.isShowing = !this.isShowing;
    }

    onRemove() {
        this.bind();
    }

    @computedFrom("data.InternalNote.DocumentNo")
    get isEdit() {
        if (this.data.InternalNote != undefined) {
            return (this.data.InternalNote.DocumentNo || '').toString() != '';
        }
    }

    get internalNoteLoader() {
        return InternalNoteLoader;
    }

}