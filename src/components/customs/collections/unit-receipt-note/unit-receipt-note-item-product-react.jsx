import React from 'react';

import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx';
import UomAutoSuggestReact from '../../auto-suggests/react/uom-auto-suggest-react.jsx';
import ProductAutoSuggestReact from '../../auto-suggests/react/product-auto-suggest-react.jsx';

'use strict';

export default class UnitReceiptNoteItemProductReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleDeliveredQuantity = this.handleDeliveredQuantity.bind(this);
        this.handleDeliveredUom = this.handleDeliveredUom.bind(this);
        this.handleRemark = this.handleRemark.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleRemove() {
        if (this.props.onRemove)
            this.props.onRemove(this.state.value);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleDeliveredQuantity(quantity) {
        var value = this.state.value;
        value.deliveredQuantity = quantity;
        this.handleValueChange(value);
    }

    handleDeliveredUom(event, uom) {
        var value = this.state.value;
        value.deliveredUom = uom;
        this.handleValueChange(value);
    }

    handleRemark(remark) {
        var value = this.state.value;
        value.remark = remark;
        this.handleValueChange(value);
    }

    componentWillMount() {
        var _value = this.props.value;
        this.setState({ value: _value || {}, error: this.props.error || {}, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        var _value = props.value;
        this.setState({ value: _value || {}, error: props.error || {}, options: props.options || {} });
    }

    render() {
        var readOnlyOptions = Object.assign({}, this.state.options, { readOnly: true });
        var removeButton = null

        if (!this.state.options.readOnly)
            removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;

        var style = {
            margin: 0 + 'px'
        }
        return (
            <tr>
                <td>
                    <div className={`form-group`} style={style}>
                        <ProductAutoSuggestReact value={this.state.value.product} options={readOnlyOptions} ></ProductAutoSuggestReact>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.deliveredQuantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.deliveredQuantity} options={this.state.options} onChange={this.handleDeliveredQuantity} />
                        <span className="help-block">{this.state.error.deliveredQuantity}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group`} style={style}>
                        <UomAutoSuggestReact value={this.state.value.deliveredUom} options={readOnlyOptions} onChange={this.handleDeliveredUom} />
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.remark ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.remark} options={this.state.options} onChange={this.handleRemark} />
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