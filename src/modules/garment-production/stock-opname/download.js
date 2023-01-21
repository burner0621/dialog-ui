import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

const UnitLoader = require('../../../loader/garment-units-loader');
const StorageLoader = require('../../../loader/storage-loader');

@inject(Router, Service)
export class Create {
    @bindable unit;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        editText: "Download"
    };

    controlOptions = {
        label: {
            length: 5
        },
        control: {
            length: 7
        }
    };

    get unitLoader() {
        return UnitLoader;
    }

    get storageLoader() {
        return StorageLoader;
    }

    get storageFilter() {
        return { UnitId: (this.data.unit || {}).Id || -1 };
    }

    unitView = (unit) => {
        return unit.Code;
    }

    storageView = (storage) => {
        return storage.name;
    }

    bind(context) {
        this.context = context;
        this.data = {};
        this.error = {};
    }

    unitChanged(newValue) {
        this.data.unit = newValue;
        this.context.storageViewModel.editorValue = "";
        this.data.storage = null;
    }

    cancelCallback() {
        this.router.navigateToRoute('list');
    }

    editCallback() {
        this.error = {};
        this.service.download({
            date: this.data.date ? this.data.date.toJSON() : null,
            unit: (this.data.unit || {}).Code,
            storage: (this.data.storage || {}).code,
            storageName: (this.data.storage || {}).name,
        }).catch(error => {
            this.error = error;
        });
    }
}