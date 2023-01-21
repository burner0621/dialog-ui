import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import MachineAutoSuggestReactByDivision from './react/machine-auto-suggest-react-by-division.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('machine-auto-suggest-by-division')
export default class MachineAutoSuggestByDivision extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = MachineAutoSuggestReactByDivision;
    }
} 