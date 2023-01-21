import React from 'react';
import RoleAutoSuggestReact from '../../auto-suggests/react/role-auto-suggest-react.jsx';

'use strict';

export default class RoleItemReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(event, value) {
        var role = this.state.value;
        // role._id = value._id;
        // role.code = value.code;
        // role.name = value.name;
        // role.permissions = value.permissions;
        Object.assign(role, value);
        role.toString = value.toString;
        this.setState({ value: role });
        if (this.props.onChange)
            this.props.onChange(role);
    }

    handleRemove(e) {
        e.preventDefault();

        if (this.props.onRemove)
            this.props.onRemove(this.state.value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || {}, error: this.props.error, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || {}, error: props.error, options: props.options || {} });
    }

    render() {
        var readOnlyOptions = { readOnly: this.state.options.readOnly };
        var removeButton = null

        if (!this.state.options.readOnly)
            removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;

        var style = {
            margin: 0 + 'px'
        } 
        
        return (
            <tr>
                <td>
                    <div className={`form-group ${this.state.error ? 'has-error' : ''}`} style={style}>
                        <RoleAutoSuggestReact value={this.state.value} options={readOnlyOptions} onChange={this.handleValueChange}></RoleAutoSuggestReact>
                        <span className="help-block">{this.state.error}</span>
                    </div>
                </td>
                <td>
                    {removeButton}
                </td>
            </tr>
        )
    }
} 