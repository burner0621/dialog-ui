import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import MachineAutoSuggestReact from './react/machine-auto-suggest-react.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('machine-auto-suggest')
export default class MachineAutoSuggest extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) placeholder;

    constructor(element) {
        super(element);
        this.control = MachineAutoSuggestReact;
    }
} 