import React from 'react';


import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx'; 
import UomAutoSuggestReact from '../../auto-suggests/react/uom-auto-suggest-react.jsx'; 
import ColorTypeAutoSuggestReact from '../../auto-suggests/react/color-type-auto-suggest-react.jsx'; 

'use strict';

export default class ProductionOrderDetailReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleColorTypeChange = this.handleColorTypeChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleUomChange = this.handleUomChange.bind(this);
        this.handleColorRequestChange = this.handleColorRequestChange.bind(this);
        this.handleColorTemplateChange = this.handleColorTemplateChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }


    handleColorRequestChange(colorRequest) {
        var value = this.state.value;
        value.colorRequest = colorRequest;
        this.handleValueChange(value);
    }

    handleColorTemplateChange(colorTemplate) {
        var value = this.state.value;
        value.colorTemplate = colorTemplate;
        this.handleValueChange(value);
    }

    handleQuantityChange(quantity) {
        var value = this.state.value;
        value.quantity = quantity;
        this.handleValueChange(value);
    }

    handleUomChange(event, uom) {
        var value = this.state.value;
        value.uom = uom;
        this.handleValueChange(value);
    }

    handleColorTypeChange(event, colorType) {
        var value = this.state.value;
        value.colorType = colorType;
        if(colorType)
        value.colorTypeId =colorType._id;
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
        var removeButton = null;

        if (!this.state.options.readOnly)
            removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;

        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.colorTemplate ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.colorTemplate} options={readOnlyOptions} onChange={this.handleColorTemplateChange}></TextboxReact>
                        <span className="help-block">{this.state.error.colorTemplate}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.colorRequest ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.colorRequest} options={readOnlyOptions} onChange={this.handleColorRequestChange}></TextboxReact>
                        <span className="help-block">{this.state.error.colorRequest}</span>
                    </div>
                </td>
                { this.state.options.printing ?
                    <td className="hidden">
                        <div  className={`form-group ${this.state.error.colorType ? 'has-error' : ''}`} style={style}> 
                            <ColorTypeAutoSuggestReact value={this.state.value.colorType} options={this.state.options} onChange={this.handleColorTypeChange}></ColorTypeAutoSuggestReact>
                            <span className="help-block">{this.state.error.colorType}</span>
                        </div>
                    </td> :
                    <td>
                        <div className={`form-group ${this.state.error.colorType ? 'has-error' : ''}`} style={style}> 
                            <ColorTypeAutoSuggestReact value={this.state.value.colorType} options={this.state.options} onChange={this.handleColorTypeChange}></ColorTypeAutoSuggestReact>
                            <span className="help-block">{this.state.error.colorType}</span>
                        </div>
                    </td>
                }
                <td>
                    <div className={`form-group ${this.state.error.quantity ? 'has-error' : ''}`} style={style}>
                        <NumericReact value={this.state.value.quantity} options={this.state.options} onChange={this.handleQuantityChange} />
                        <span className="help-block">{this.state.error.quantity}</span>
                    </div>
                </td>
                <td>
                    <div className="form-group" style={style}>
                        <UomAutoSuggestReact value={this.state.value.uom || ''} options={uomOptions} onchange={this.handleUomChange} />
                    </div>
                </td>
                {this.state.options.readOnly ?
                    <td className="hidden">
                        {removeButton}
                    </td> :
                    <td>
                        {removeButton}
                    </td>}
            </tr>
        )
    }
} 