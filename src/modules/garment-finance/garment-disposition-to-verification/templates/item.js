import { bindable, inject } from 'aurelia-framework';
import moment from 'moment';
import numeral from 'numeral';
import { Service } from '../service';
const InternalNoteLoader = require('../../shared/disposition-note-loader-verification');

@inject(Service)
export class Item {

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    columns = ["Unit", "Nama Barang", "Jumlah", "Harga"];

    onRemove() {
        this.bind();
    }

    toggle() {
        this.isShowing = !this.isShowing;
    }

    get dispositionNoteLoader() {
        return InternalNoteLoader;
    }
}
