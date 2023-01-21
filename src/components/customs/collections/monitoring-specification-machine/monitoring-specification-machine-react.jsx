import React from 'react';

import TextboxReact from '../../../form/basic/react/textbox-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx';
import DropDownReact from '../../../form/basic/react/dropdown-react.jsx';

'use strict';

export default class MonitoringSpecificationMachineReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleIndicatorChange = this.handleIndicatorChange.bind(this);
        // this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
        this.handleIndicatorValueChange = this.handleIndicatorValueChange.bind(this);


        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleIndicatorChange(indicator) {
        var value = this.state.value;
        value.Indicator = indicator;
        // value.productId = product._id;
        this.handleValueChange(value);
    }

    // handleDataTypeChange(dataType) {
    //     var value = this.state.value;
    //     value.dataType = dataType;
    //     this.handleValueChange(value);
    // }

    handleIndicatorValueChange(data) {
        var value = this.state.value;
        // value.value=this.state.value.defaultValue;
        value.Value = (data);
        this.handleValueChange((value));
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
        var valueBox = null;

        var readOnlyOptions = this.state.options.isMaster == true ? this.state.options : Object.assign({}, this.state.options, { readOnly: true });


        if (this.state.value.DataType == "input teks") {

            valueBox = <TextboxReact value={this.state.value.Value} placeholder="input teks" options={this.state.options} onChange={this.handleIndicatorValueChange} />

        } else if (this.state.value.DataType == "input angka") {
            valueBox = <NumericReact value={this.state.value.Value} placeholder="input angka" options={this.state.options} onChange={this.handleIndicatorValueChange} />
        } else if (this.state.value.DataType == "input pilihan" || this.state.value.DataType == "option") {

            var items = this.state.value.DefaultValue.split(",");
            var valueOptions = Object.assign({}, this.state.options, { selections: items });
            valueBox = <DropDownReact value={this.state.value.Value} options={valueOptions} onChange={this.handleIndicatorValueChange}/>

        } else {
            var skala = "skala: " + this.state.value.DefaultValue;
            valueBox = <NumericReact value={this.state.value.Value} placeholder={skala} options={this.state.options} onChange={this.handleIndicatorValueChange} />
        }


        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.Indicator ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.Indicator} options={readOnlyOptions} />
                        <span className="help-block">{this.state.error.Indicator}</span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.Value ? 'has-error' : ''}`} style={style}>
                        {valueBox}
                        <span className="help-block">{this.state.error.Value} </span>
                    </div>
                </td>
                <td>
                    <div className={`form-group ${this.state.error.Uom ? 'has-error' : ''}`} style={style}>
                        <TextboxReact value={this.state.value.Uom} options = { readOnlyOptions } />
                        <span className="help-block">{this.state.error.Uom} </span>
                    </div>
                </td>
            </tr>
        )
    }
} 