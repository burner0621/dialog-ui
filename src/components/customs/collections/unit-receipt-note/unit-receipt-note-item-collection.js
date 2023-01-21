import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import UnitReceiptNoteItemCollectionReact from './unit-receipt-note-item-collection-react.jsx';


@noView()
@inject(Element)
@customElement('unit-receipt-note-item-collection')
export class UnitReceiptNoteItemCollection {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;

    reactComponent = {};
    constructor(element) {
        this.element = element;
    }

    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };
        this.reactComponent = ReactDOM.render(
            <UnitReceiptNoteItemCollectionReact value={this.value} error={this.error} options={this.options}></UnitReceiptNoteItemCollectionReact>,
            this.element
        );
    }

    bind() {
        this.value = this.value || [];
        this.error = this.error || [];
        this.render();
    }

    unbind() {
        ReactDOM.unmountComponentAtNode(this.element);
    }

    /**
     * Data Changed
     * 
     * An automatic callback function when our "data"
     * bindable value changes. We need to rebind the React
     * element to get the new data from the ViewModel.
     * 
     * @param {any} newVal The updated data
     * @returns {void}
     * 
     */
    valueChanged(newVal) {
        this.bind();
    }
    errorChanged(newError) {
        this.bind();
    }

}
