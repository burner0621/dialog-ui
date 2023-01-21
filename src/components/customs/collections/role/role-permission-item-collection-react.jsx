import React from 'react';
import RolePermissionItemReact from './role-permission-item-react.jsx';

'use strict';

export default class RolePermissionItemCollectionReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }


    componentWillMount() {
        this.setState({ value: this.props.value || [], error: this.props.error || [], options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || [], error: props.error || [], options: props.options || {} });
    }

    handleItemAdd(e) {
        e.preventDefault();
        var newItem = {
            unit: { toString: function () { return '' } },
            // unitId: { toString: function () { return '' } },
            permission: 1
        };
        this.state.value.push(newItem);
        this.setState({ value: this.state.value });

        if (this.props.onAddItem)
            this.props.onAddItem(newItem);
    }

    handleItemRemove(item) {
        var value = this.state.value;
        var itemIndex = value.indexOf(item);
        value.splice(itemIndex, 1);
        this.setState({ value: value });
    }

    render() {
        var items = (this.state.value || []).map(function (item, index) {
            var error = this.state.error[index] || {};
            return (
                <RolePermissionItemReact key={"__item" + index} value={item} error={error} options={this.state.options} onRemove={this.handleItemRemove}></RolePermissionItemReact>
            );
        }.bind(this))

        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd}>add</button>;
        if (this.state.options.readOnly)
            addButton = <span></span>;
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th width="72%" rowSpan="2">Unit</th>
                        <th width="18%" colSpan="3">Permission</th> 
                        <th width="10%" rowSpan="2">
                            {addButton}
                        </th>
                    </tr>
                    <tr>
                        <th width="6%">R</th> 
                        <th width="6%">W</th> 
                        <th width="6%">X</th> 
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        )
    }
} 