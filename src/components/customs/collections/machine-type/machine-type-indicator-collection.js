import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import MachineTypeIndicatorCollectionReact from './machine-type-indicator-collection-react.jsx';


@noView()
@inject(Element)
@customElement('machine-type-indicator-collection')
export class MachineTypeIndicatorCollection {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) isSplit;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    // @bindable({ defaultBindingMode: bindingMode.twoWay }) dropDown;


    dataType = ["string", "numeric"];

    reactComponent = {};
    constructor(element) {
        this.element = element;
        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);
    }

    handleItemAdd() {

        this.value.push({
            indicator: "",
            dataType: "",
            defaultValue: "",
            uom:"",
    
        });
        this.bind();
    }

    handleItemRemove(item) {
        var itemIndex = this.value.indexOf(item);
        this.value.splice(itemIndex, 1);
        this.bind();
    }

    render() {
        // this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true', isSplit: (this.isSplit || '').toString().toLowerCase() === 'true' };
        this.reactComponent = ReactDOM.render(
            <MachineTypeIndicatorCollectionReact value={this.value} error={this.error} options={this.options}></MachineTypeIndicatorCollectionReact>,
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
