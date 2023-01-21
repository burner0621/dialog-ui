import { inject, bindable, computedFrom } from 'aurelia-framework';

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor() {
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    activate() {
    }

    attached() {
    }

} 
