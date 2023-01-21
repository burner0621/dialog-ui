import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';
import '../../../../styles/timepicker-style.css';

import FieldReact from './react/field-react.jsx';
import TimePickerReact from 'rc-time-picker';
import moment from 'moment';

@noView()
@inject(Element)
@customElement('timepicker')
export class Timepicker {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) disabled;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) format;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) showsecond;

    reactComponent = {};
    constructor(element) {
        this.element = element;
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(value) {
        this.value = value;
    }

    _beforeRender()
    {
        if (this.value && Object.keys(this.value).length === 0 && this.value.constructor === Object)
            this.value = moment();

        this.disabled = (this.disabled || '').toString().toLowerCase() === 'true';

        if (this.showsecond === null || this.showsecond === undefined || this.showsecond === '')
            this.showsecond = true;

        if (this.format){
            this.format = this.format;
        }
        else{
            this.format = "HH:mm:ss";
        }
    }

    render() {
        
        this._beforeRender();
        this.reactComponent = ReactDOM.render(
            <FieldReact label={this.label} error={this.error}>
                <TimePickerReact 
                    showSecond={this.showsecond}
                    disabled={this.disabled}
                    value={this.value} 
                    format={this.format}
                    onChange={this.handleValueChange}/>
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
