import React from 'react';

import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx';
import CheckboxReact from '../../../form/basic/react/checkbox-react.jsx';
import UomAutoSuggestReact from '../../auto-suggests/react/uom-auto-suggest-react.jsx';
import ProductAutoSuggestReact from '../../auto-suggests/react/product-auto-suggest-react.jsx';

'use strict';

export default class PurchaseOrderItemReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);

        this.handleDealQuantityChange = this.handleDealQuantityChange.bind(this);
        this.handleDealUomChange = this.handleDealUomChange.bind(this);
        this.handlePricePerDealUnitChange = this.handlePricePerDealUnitChange.bind(this);
        this.handleconversionChange = this.handleconversionChange.bind(this);
        this.handleUseIncometaxChange = this.handleUseIncometaxChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleDealQuantityChange(quantity) {
        var value = this.state.value;
        value.dealQuantity = quantity;
        this.handleValueChange(value);
    }

    handleDealUomChange(event, uom) {
        var value = this.state.value;
        value.dealUom = uom;
        if (value.dealUom.unit)
            if (value.dealUom.unit == value.defaultUom.unit)
                value.conversion = 1;
        this.handleValueChange(value);
    }

    handlePricePerDealUnitChange(price) {
        var value = this.state.value;
        value.priceBeforeTax = price;
        this.updatePrice(value);
    }

    handleUseIncometaxChange(useIncomeTax) {
        var value = this.state.value;
        value.useIncomeTax = useIncomeTax;
        this.updatePrice(value);
    }

    handleconversionChange(conversion) {
        var value = this.state.value;
        value.conversion = conversion;
        if (value.dealUom.unit)
            if (value.dealUom.unit == value.defaultUom.unit)
                value.conversion = 1;
        this.handleValueChange(value);
    }

    updatePrice(value) {
        this.setState({ value: value });
        if (value.useIncomeTax) {
            value.pricePerDealUnit = (100 * value.priceBeforeTax) / 110;
        } else {
            value.pricePerDealUnit = value.priceBeforeTax;
        }
        this.handleValueChange(value);
    }

    componentWillMount() {
        var _value = this.props.value;
        _value.priceBeforeTax = _value.priceBeforeTax != 0 ? _value.priceBeforeTax : _value.product.price;
        _value.dealQuantity = _value.dealQuantity != 0 ? _value.dealQuantity : _value.defaultQuantity;
        _value.dealUom = _value.dealUom._id ? _value.dealUom : _value.defaultUom;
        _value.conversion = _value.conversion != 1 ? _value.conversion : 1;
        this.setState({ value: _value || {}, error: this.props.error || {}, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        var _value = props.value;
        _value.priceBeforeTax = _value.priceBeforeTax != 0 ? _value.priceBeforeTax : _value.product.price;
        _value.dealQuantity = _value.dealQuantity != 0 ? _value.dealQuantity : _value.defaultQuantity;
        _value.dealUom = _value.dealUom._id ? _value.dealUom : _value.defaultUom;
        _value.conversion = _value.conversion != 1 ? _value.conversion : 1;
        this.setState({ value: _value || {}, error: props.error || {}, options: props.options || {} });
    }

    render() {
        var readOnlyOptions = Object.assign({}, this.state.options, { readOnly: true });
        var dealQtyOptions = Object.assign({}, this.state.options, { min: 0 });
        var dealUomOptions = this.state.options;
        var isUseIncomeTax = this.state.options.useIncomeTax || false;

        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.product ? 'has-error' : ''}`} style={style}>
                        <ProductAutoSuggestReact value={this.state.value.product} options={readOnlyOptions}></ProductAutoSuggestReact>
                        <span className="help-block">{this.state.error.product}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.defaultQuantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.defaultQuantity} options={readOnlyOptions} />
                        <span className="help-block">{this.state.error.defaultQuantity}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.defaultUom ? 'has-error' : ''}`} style={style}>
                        <UomAutoSuggestReact value={this.state.value.defaultUom} options={readOnlyOptions} />
                        <span className="help-block">{this.state.error.defaultUom}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.dealQuantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.dealQuantity} options={dealQtyOptions} onChange={this.handleDealQuantityChange} />
                        <span className="help-block">{this.state.error.dealQuantity}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.dealUom ? 'has-error' : ''}`} style={style}>
                        <UomAutoSuggestReact value={this.state.value.dealUom} options={dealUomOptions} onChange={this.handleDealUomChange} />
                        <span className="help-block">{this.state.error.dealUom}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.conversion ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.conversion} options={this.state.options} onChange={this.handleconversionChange} />
                        <span className="help-block">{this.state.error.conversion}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.priceBeforeTax ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.priceBeforeTax} options={this.state.options} onChange={this.handlePricePerDealUnitChange} />
                        <span className="help-block">{this.state.error.priceBeforeTax}</span>
                    </div>
                </td>
                {isUseIncomeTax ?
                    <td>
                        <div className={`form-group`} style={style}>
                            <CheckboxReact value={this.state.value.useIncomeTax} options={this.state.options} onChange={this.handleUseIncometaxChange} />
                        </div>
                    </td> :
                    <td className="hidden">
                        <div className={`form-group`} style={style}>
                            <CheckboxReact value={this.state.value.useIncomeTax} options={this.state.options} onChange={this.handleUseIncometaxChange} />
                        </div>
                    </td>}
                <td>
                    <div className={`form-group ${this.state.error.remark ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.remark} options={readOnlyOptions} onChange={this.handleRemarkChange} />
                        <span className="help-block">{this.state.error.remark}</span>
                    </div>
                </td>
            </tr>
        )
    }
} 