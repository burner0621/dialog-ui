import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import ProductionOrderDetailCollectionReact from './production-order-detail-collection-react.jsx';


@noView()
@inject(Element)
@customElement('production-order-detail-collection')
export class ProductionOrderCollection {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) printing;

    reactComponent = {};
    constructor(element) {
        this.element = element;
        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);
    }

    handleItemAdd() {

        this.value.push({
            colorType: { toString: function () { return '' } },
            uom: { toString: function () { return '' } },
            colorRequest: '',
            colorTemplate: '',
            quantity: 0,
            description: '',
            printing:false
        });
        this.bind();
    }

    handleItemRemove(item) {
        var itemIndex = this.value.indexOf(item);
        this.value.splice(itemIndex, 1);
        this.bind();
    }

    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true'};

        if (this.filter)
            this.options.filter = this.filter;
        else
            this.options.filter = null;

        if (this.printing)
            this.options.printing = true;
        else
            this.options.printing = false;

        this.reactComponent = ReactDOM.render(
            <ProductionOrderDetailCollectionReact value={this.value} error={this.error} options={this.options}></ProductionOrderDetailCollectionReact>,
            this.element
        );
    }

    bind() {
        this.value = this.value || [];
        this.error = this.error || [];
        this.filter= this.filter|| {};
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
    filterChanged(newFilter) {
        this.bind();
    }
    printingChanged(newFilter) {
        this.bind();
    }
}
