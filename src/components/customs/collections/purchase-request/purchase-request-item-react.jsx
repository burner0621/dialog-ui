import React from 'react';

import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx';
import UomAutoSuggestReact from '../../auto-suggests/react/uom-auto-suggest-react.jsx';
import ProductAutoSuggestReact from '../../auto-suggests/react/product-auto-suggest-react.jsx';

'use strict';

export default class PurchaseRequestItemReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleRemarkChange = this.handleRemarkChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleProductChange(event, product) {
        var value = this.state.value;
        value.product = product;
        value.productId = product._id;
        this.handleValueChange(value);
    }

    handleQuantityChange(quantity) {
        var value = this.state.value;
        value.quantity = quantity;
        this.handleValueChange(value);
    }


    handleRemarkChange(remark) {
        var value = this.state.value;
        value.remark = remark;
        this.handleValueChange(value);
    }

    handleRemove() {
        if (this.props.onRemove)
            this.props.onRemove(this.state.value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || {}, error: this.props.error || {}, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || {}, error: props.error || {}, options: props.options || {} });
    }

    render() { 
        var readOnlyOptions = { readOnly: this.state.options.readOnly || this.state.options.isSplit };
        var QtyOptions = Object.assign({}, this.state.options, { min: 0 });
        var descOptions = readOnlyOptions;
        var uomOptions = Object.assign({}, this.state.options, { readOnly: true });
        var removeButton = null

        if (!this.state.options.readOnly)
            removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;

        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.product ? 'has-error' : ''}`} style={style}> 
                        <ProductAutoSuggestReact value={this.state.value.product} options={readOnlyOptions} onChange={this.handleProductChange}></ProductAutoSuggestReact>
                        <span className="help-block">{this.state.error.product}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.quantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.quantity} options={this.state.options} onChange={this.handleQuantityChange}/>
                        <span className="help-block">{this.state.error.quantity}</span>
                    </div>
                </td>
                <td>
                    <div className="form-group" style={style}>
                        <UomAutoSuggestReact value={this.state.value.product.uom ||''} options={uomOptions} />
                    </div>
                </td> 
                <td>
                    <div className={`form-group ${this.state.error.remark ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.remark} options={this.state.options} onChange={this.handleRemarkChange}/>
                        <span className="help-block">{this.state.error.remark}</span>
                    </div>
                </td>
                <td>
                    {removeButton}
                </td>
            </tr>
        )
    }
} 