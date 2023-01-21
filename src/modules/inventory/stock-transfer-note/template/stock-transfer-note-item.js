import { inject, bindable } from 'aurelia-framework';
import { Service } from '../service';

const InventorySummaryLoader = require('../../../../loader/inventory-summaries-loader');

@inject(Service)
export class StokTransferNoteItem {
    @bindable summary

    constructor(service) {
        this.service = service;
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.readOnly = context.options.readOnly;

        this.summary = this.data.Summary || null;
    }

    summaryChanged(newValue, oldValue) {
        if (newValue) {
			this.data.Summary = newValue;
		}
		else {
			this.data.Summary = undefined;
		}
    }

    onRemove() {
        this.bind();
    }

    get inventorySummaryLoader() {
        return InventorySummaryLoader
    }
}