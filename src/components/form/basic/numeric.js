import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import FieldReact from './react/field-react.jsx';
import NumericReact from './react/numeric-react.jsx';

@noView()
@inject(Element)
@customElement('numeric')
export class Numeric {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) postfix;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) fraction;

    reactComponent = {};
    constructor(element) {
        this.element = element;
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(value) {
        this.value = value;
    }

    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true', postFix: this.postfix || "", fraction: this.fraction };
        this.value = parseFloat((this.value||'0').toString());
        
        this.reactComponent = ReactDOM.render(
            <FieldReact label={this.label} error={this.error}>
                <NumericReact value={this.value} placeholder={this.placeholder} onChange={this.handleValueChange} options={this.options} />
            </FieldReact>,
            this.element
        );
    }

    bind() {
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
        var event;

        if (document.createEvent) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent("change", true, true, newVal);
        } else {
            event = document.createEventObject();
            event.eventType = "change";
        }

        event.eventName = "change";

        if (document.createEvent) {
            this.element.dispatchEvent(event);
        } else {
            this.element.fireEvent("on" + event.eventType, event);
        }
    }
    errorChanged(newError) {
        this.bind();
    }

}
