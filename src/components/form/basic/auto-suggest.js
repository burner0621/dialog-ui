import React from 'react';
import ReactDOM from 'react-dom';
import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import FieldReact from './react/field-react.jsx';
import AutoSuggestReact from './react/auto-suggest-react.jsx';
import BaseAutoSuggest from './base-auto-suggest';

@noView()
@inject(Element)
@customElement('auto-suggest')
export default class AutoSuggest extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    // reactComponent = {};
    // suggestions = [];
    constructor(element) {
        super(element)
        // this.element = element;
        // this.handleValueChange = this.handleValueChange.bind(this);
    }

    // handleValueChange(event, value) {
    //     this.value = value;
    // }

    // render() {
    //     this.options = this.options || {};
    //     if (this.filter)
    //         this.options.filter = this.filter;
    //     else
    //         this.options.filter = null;
    //     var _options = Object.assign({ suggestions: this.suggestions, readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' }, this.options);
    //     this.reactComponent = ReactDOM.render(
    //         <FieldReact label={this.label} error={this.error}>
    //             <AutoSuggestReact value={this.value} options={_options} onChange={this.handleValueChange} />
    //         </FieldReact>,
    //         this.element
    //     );
    // }

    // bind() {
    //     this.render();
    // }

    // unbind() {
    //     ReactDOM.unmountComponentAtNode(this.element);
    // }

    // /**
    //  * Value Changed
    //  * 
    //  * An automatic callback function when our "data"
    //  * bindable value changes. We need to rebind the React
    //  * element to get the new data from the ViewModel.
    //  * 
    //  * @param {any} newVal The updated data
    //  * @returns {void}
    //  * 
    //  */
    // valueChanged(newVal) {
    //     this.bind();
    // }

}


// module.exports.AutoSuggest = AutoSuggest;