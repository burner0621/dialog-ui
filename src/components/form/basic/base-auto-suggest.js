import React from 'react';
import ReactDOM from 'react-dom';
import { bindable, bindingMode, } from 'aurelia-framework';

import FieldReact from './react/field-react.jsx';
import AutoSuggestReact from './react/auto-suggest-react.jsx';

export default class BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

    reactComponent = {};
    suggestions = [];
    control = null;

    constructor(element) {
        this.element = element;
        this.handleValueChange = this.handleValueChange.bind(this);
        this.control = AutoSuggestReact;
    }

    handleValueChange(event, value) { 
        this.value = value;
    }

    render() {
        this.options = this.options || {};
        if (this.filter)
            this.options.filter = this.filter;
        else
            this.options.filter = null;
        var _options = Object.assign({ readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' }, this.options);
        var AutoSuggestControl = this.control;
        this.reactComponent = ReactDOM.render(
            <FieldReact label={this.label} error={this.error}>
                <AutoSuggestControl value={this.value} options={_options} onChange={this.handleValueChange} />
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
     * Value Changed
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

    labelChanged(newLabel) {
        this.bind();
    }
    errorChanged(newError) {
        this.bind();
    }
    filterChanged(newFilter) {
        this.bind();
    }
    readOnlyChanged(newReadOnly) {
        this.bind();
    }
    optionsChanged(newOptions) {
        this.bind();
    }

}


// module.exports.AutoSuggest = AutoSuggest;