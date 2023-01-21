import React from 'react';
import LampStandardAutoSuggestReact from '../../auto-suggests/react/lamp-standard-auto-suggest-react.jsx';

'use strict';

export default class ProductionOrderLampStandardReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleLampStandardChange = this.handleLampStandardChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleLampStandardChange(event, lampStandard) {
        var value = this.state.value;
        value.lampStandard = lampStandard;
        value.lampStandardId = lampStandard._id;
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
        var removeButton = null

        if (!this.state.options.readOnly)
            removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;

        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error.lampStandard ? 'has-error' : ''}`} style={style}> 
                        <LampStandardAutoSuggestReact value={this.state.value.lampStandard} options={readOnlyOptions} onChange={this.handleLampStandardChange}></LampStandardAutoSuggestReact>
                        <span className="help-block">{this.state.error.lampStandard}</span>
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