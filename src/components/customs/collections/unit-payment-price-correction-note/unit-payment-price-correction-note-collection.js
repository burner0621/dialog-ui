import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import UnitPaymentPriceCorrectionNoteCollectionReact from './unit-payment-price-correction-note-collection-react.jsx';

@noView()
@inject(Element)
@customElement('unit-payment-price-correction-note-collection')
export class UnitPaymentPriceCorrectionNoteCollection {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) priceReadOnly;

    reactComponent = {};
    constructor(element) {
        this.element = element;
    }

    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };
        if (this.priceReadOnly)
            this.options.priceReadOnly = this.priceReadOnly;
        else
            this.options.priceReadOnly = false;
        this.reactComponent = ReactDOM.render(
            <UnitPaymentPriceCorrectionNoteCollectionReact value={this.value} error={this.error} options={this.options}></UnitPaymentPriceCorrectionNoteCollectionReact>,
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

    priceReadOnlyChanged(newVal) {
        this.bind();
    }
}
