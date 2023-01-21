import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import FieldReact from './react/field-react.jsx';
import DatePickerReact from './react/datepicker-react.jsx';
import moment from 'moment';

@noView()
@inject(Element)
@customElement('datepicker')
export class Datepicker {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) format;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) min;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) max;

    reactComponent = {};
    constructor(element) {
        this.element = element;
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(value) {
        this.value = value;
    }

    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };
        if (this.format)
            this.options.format = this.format;
        else
            this.options.format = "DD MMMM YYYY";

        if (this.min)
            this.options.min = this.min;
        else
            this.options.min = null;

        if (this.max)
            this.options.max = this.max;
        else
            this.options.max = null;

        this.reactComponent = ReactDOM.render(
            <FieldReact label={this.label} error={this.error}>
                <DatePickerReact value={this.value} onChange={this.handleValueChange} options={this.options} />
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
    minChanged(newError) {
        this.bind();
    }
    maxChanged(newError) {
        this.bind();
    }

}
