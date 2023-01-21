import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import ColorAutoSuggestReactByProductionOrder from './react/color-auto-suggest-react-by-production-order.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('color-auto-suggest-by-production-order')
export default class ColorAutoSuggestByProductionOrder extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = ColorAutoSuggestReactByProductionOrder;
    }
} 