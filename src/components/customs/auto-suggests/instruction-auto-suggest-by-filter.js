import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import InstructionAutoSuggestReactByFilter from './react/instruction-auto-suggest-react-by-filter.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('instruction-auto-suggest-by-filter')
export default class InstructionAutoSuggestByFilter extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = InstructionAutoSuggestReactByFilter;
    }
} 