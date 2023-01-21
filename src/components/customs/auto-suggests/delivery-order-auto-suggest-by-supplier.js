import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import DeliveryOrderAutoSuggestReactBySupplier from './react/delivery-order-auto-suggest-react-by-supplier.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('delivery-order-auto-suggest-by-supplier')
export default class DeliveryOrderAutoSuggestBySupplier extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = DeliveryOrderAutoSuggestReactBySupplier;
    }
} 