import React from 'react';

import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx';
import UomAutoSuggestReact from '../../auto-suggests/react/uom-auto-suggest-react.jsx';
import ProductAutoSuggestReact from '../../auto-suggests/react/product-auto-suggest-react.jsx';

'use strict';

export default class UnitReceiptNoteItemReact extends React.Component {
    constructor(props) {
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
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
                    <div className={`form-group ${this.state.error.deliveredQuantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.deliveredQuantity} options={readOnlyOptions}/>
                        <span className="help-block">{this.state.error.deliveredQuantity}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.deliveredUom ? 'has-error' : ''}`} style={style}>
                        <UomAutoSuggestReact value={this.state.value.deliveredUom} options={readOnlyOptions} />
                        <span className="help-block">{this.state.error.deliveredUom}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.pricePerDealUnit ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.pricePerDealUnit} options={readOnlyOptions}/>
                        <span className="help-block">{this.state.error.pricePerDealUnit}</span>
                    </div>
                </td> 
                <td>
                    <div className={`form-group`} style={style}>
                        <NumericReact value={this.state.value.pricePerDealUnit * this.state.value.deliveredQuantity} options={readOnlyOptions}/>
                    </div>
                </td>  
            </tr>
        )
    }
} 