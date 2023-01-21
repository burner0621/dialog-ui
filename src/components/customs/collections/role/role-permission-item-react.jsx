import React from 'react';
import UnitAutoSuggestReact from '../../auto-suggests/react/unit-auto-suggest-react.jsx'; 

'use strict';

export default class RolePermissionItemReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handlePermissionChange = this.handlePermissionChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.permissions = [{ name: "R", value: 4 }, { name: "W", value: 2 }, { name: "X", value: 1 }];
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleUnitChange(event, unit) {
        var value = this.state.value;
        value.unit = unit;
        value.unitId = unit.Id;
        this.handleValueChange(value);
    }

    handlePermissionChange(e) {
        let clickedValue = e.target.value;
        let clickedRef = e.target.name;
        // if (clickedValue !== 'selectAll' && this.refs[clickedRef].checked) {
        //     this.setState({
        //         checkedCount: this.state.checkedCount + 1
        //     });
        // } else if (clickedValue !== 'selectAll' && !this.refs[clickedRef].checked) {
        //     this.setState({
        //         checkedCount: this.state.checkedCount - 1
        //     });
        // }
        var selectedValues = $.map(this.refs, function (value, index) { return value }).filter(option => option.checked).map(option => parseInt(option.value, 10));
        var sum = selectedValues.reduce((prev, curr, index) => { return prev + curr; }, 0);
        var value = this.state.value;
        value.permission = sum;
        this.handleValueChange(value);
    }

    handleRemove(e) {
        e.preventDefault();
        
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
        var descOptions = readOnlyOptions;
        var removeButton = null

        const options = this.permissions.map((permission, index) => {
            var perm = this.state.value.permission;
            var checked = (perm & permission.value) !== 0;
            if (this.state.options.readOnly) {
                var text = checked ? permission.name : "";
                return (
                    <td key={"__item" + index}>
                        <span>{text}</span>
                    </td>
                );
            }
            else {
                return (
                    <td key={"__item" + index}>
                        <input onChange={this.handlePermissionChange} type='checkbox' name={permission.name} key={permission.value} checked={checked}
                            value={permission.value} ref={permission.name} />
                    </td>
                );
            }
        });

        if (!this.state.options.readOnly)
            removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;

        var style = {
            margin: 0 + 'px'
        }
        return (

            <tr>
                <td>
                    <div className={`form-group ${this.state.error.unit ? 'has-error' : ''}`} style={style}>
                        <UnitAutoSuggestReact value={this.state.value.unit} options={readOnlyOptions} onChange={this.handleUnitChange}></UnitAutoSuggestReact>
                        <span className="help-block">{this.state.error.unit}</span>
                    </div>
                </td>
                {options}
                <td>
                    {removeButton}
                </td>
            </tr>
        )
    }
} 