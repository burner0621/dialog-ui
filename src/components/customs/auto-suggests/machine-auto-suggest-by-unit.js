import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import MachineAutoSuggestReactByUnit from './react/machine-auto-suggest-react-by-unit.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('machine-auto-suggest-by-unit')
export default class MachineAutoSuggestByUnit extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = MachineAutoSuggestReactByUnit;
    }
} 