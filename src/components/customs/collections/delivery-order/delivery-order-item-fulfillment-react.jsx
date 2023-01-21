import React from 'react';

import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import RadiobuttonReact from '../../../form/basic/react/radiobutton-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx';
import UomAutoSuggestReact from '../../auto-suggests/react/uom-auto-suggest-react.jsx';
import ProductAutoSuggestReact from '../../auto-suggests/react/product-auto-suggest-react.jsx';
import PurchaseRequestAutoSuggestReactPosted from '../../auto-suggests/react/purchase-request-auto-suggest-react-posted.jsx';

'use strict';

export default class DeliveryOrderItemFulfillmentReact extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleItemFulfillmentRemove = this.handleItemFulfillmentRemove.bind(this);
        this.handleDeliveredQuantityChanged = this.handleDeliveredQuantityChanged.bind(this);
        this.handleRemarkChanged = this.handleRemarkChanged.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleItemFulfillmentRemove() {
        if (this.props.onItemFulfillementRemove)
            this.props.onItemFulfillementRemove(this.state.value);
    }

    handleDeliveredQuantityChanged(quantity) {
        var value = this.state.value;
        value.deliveredQuantity = quantity;
        this.handleValueChange(value);
    }

    handleRemarkChanged(remark) {
        var value = this.state.value;
        value.remark = remark;
        this.handleValueChange(value);
    }

    init(props) {
        var value = props.value;
        var error = props.error;
        var options = props.options;

        this.setState({ value: value, error: error, options: options });
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {
        var readOnlyOptions = { readOnly: true };
        var style = {
            margin: 0 + 'px'
        }
        var removeButton = <button className="btn btn-danger" onClick={this.handleItemFulfillmentRemove}>-</button>;
        if (this.state.options.readOnly)
            removeButton = <span></span>;
        return (
            <tr >
                <td>
                    <div className={`form-group ${this.state.error.purchaseOrder ? 'has-error' : ''} `} style={style}>
                        <PurchaseRequestAutoSuggestReactPosted value={this.state.value.purchaseOrder.purchaseRequest} options={readOnlyOptions} />
                        <span className="help-block">{this.state.error.purchaseOrder}</span>
                    </div>
                </td>
                <td>
                    <ProductAutoSuggestReact value={this.state.value.product} options={readOnlyOptions} />
                </td>
                <td>
                    <NumericReact value={this.state.value.purchaseOrderQuantity} options={readOnlyOptions} />
                </td>
                <td>
                    <UomAutoSuggestReact value={this.state.value.purchaseOrderUom} options={readOnlyOptions} />
                </td>
                <td>
                    {(this.state.value.remainingQuantity < this.state.value.deliveredQuantity && !this.state.options.readOnly) ?
                        <div className={`form-group ${this.state.value.remainingQuantity < this.state.value.deliveredQuantity ? 'has-warning' : ''}`} style={style}>
                            <NumericReact value={this.state.value.deliveredQuantity} options={this.state.options} onChange={this.handleDeliveredQuantityChanged} />
                            <span className="help-block">Jumlah diterima lebih besar dari jumlah dipesan</span>
                        </div> :
                        <div className={`form-group ${this.state.error.deliveredQuantity ? 'has-error' : ''} `} style={style}>
                            <NumericReact value={this.state.value.deliveredQuantity} options={this.state.options} onChange={this.handleDeliveredQuantityChanged} />
                            <span className="help-block">{this.state.value.remainingQuantity < this.state.value.deliveredQuantity ? '' : this.state.error.deliveredQuantity}</span>
                        </div>
                    }

                </td>
                <td>
                    <TextboxReact value={this.state.value.remark} options={this.state.options} onChange={this.handleRemarkChanged} />
                </td>
                <td>{removeButton}</td>
            </tr>);

    }
}