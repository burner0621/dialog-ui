import React from 'react';
import PurchaseOrderItemReact from './purchase-order-item-react.jsx';

'use strict';

export default class PurchaseOrderItemCollectionReact extends React.Component {
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
            product: { toString: function () { return '' } },
            defaultQuantity: 0,
            defaultMeasurement: { toString: function () { return '' } },
            dealQuantity: 0,
            dealMeasurement: { toString: function () { return '' } },
            price: 0,
            description: ''
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
                <PurchaseOrderItemReact key={"__item" + index} value={item} error={error} options={this.state.options} onRemove={this.handleItemRemove}></PurchaseOrderItemReact>
            );
        }.bind(this))

        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd}>+</button>;
        if (this.state.options.readOnly || this.state.options.isSplit)
            addButton = <span></span>;
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th width="40%">Barang</th>
                        <th width="10%">Jumlah</th>
                        <th width="20%">Satuan</th>
                        <th width="25%">Ket.</th>
                        <th width="5%"></th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        )
    }
} 