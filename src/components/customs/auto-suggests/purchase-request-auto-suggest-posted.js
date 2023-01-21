import { customElement, inject, bindable, bindingMode, noView } from 'aurelia-framework';

import PurchaseRequestAutoSuggestReactPosted from './react/purchase-request-auto-suggest-react-posted.jsx';
import BaseAutoSuggest from '../../form/basic/base-auto-suggest';

@noView()
@inject(Element)
@customElement('purchase-request-auto-suggest-posted')
export default class PurchaseRequestAutoSuggestPosted extends BaseAutoSuggest {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) options;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) filter;

    constructor(element) {
        super(element);
        this.control = PurchaseRequestAutoSuggestReactPosted;
    }
} 