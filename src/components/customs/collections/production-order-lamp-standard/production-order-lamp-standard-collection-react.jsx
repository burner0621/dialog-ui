import React from 'react';
import ProductionOrderLampStandardReact from './production-order-lamp-standard-react.jsx';

'use strict';

export default class ProductionOrderLampStandardCollectionReact extends React.Component {
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

    handleItemAdd() {
        var newItem = {
            lampStandard: { toString: function () { return '' } },
            lampstandardId: { toString: function () { return '' } }
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
                <ProductionOrderLampStandardReact key={"__item" + index} value={item} error={error} options={this.state.options} onRemove={this.handleItemRemove}></ProductionOrderLampStandardReact>
            );
        }.bind(this))

        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd}>+</button>;
        if (this.state.options.readOnly)
            addButton = <span></span>;
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th width="90%">Standar Lampu</th>
                        {this.state.options.readOnly ?
                            <th width="10%" className="hidden">
                                {addButton}
                            </th> :
                            <th width="10%">
                                {addButton}
                            </th>}
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        )
    }
} 