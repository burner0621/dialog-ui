import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import PurchaseOrderAutoSuggestReactByUser from './react/purchase-order-auto-suggest-react-by-user.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('purchase-order-auto-suggest-by-user')
export default class PurchaseOrderAutoSuggestByUser extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = PurchaseOrderAutoSuggestReactByUser;
    }
} 