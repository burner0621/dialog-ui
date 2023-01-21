import React from 'react';
import UnitReceiptNoteAutoSuggestReactBySupplierByUnit from '../../auto-suggests/react/unit-receipt-note-auto-suggest-react-by-supplier-by-unit.jsx';
import UnitReceiptNoteItemReact from './unit-receipt-note-item-react.jsx';

'use strict';

export default class UnitPaymentOrderItemReact extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleUnitReceiptNoteChange = this.handleUnitReceiptNoteChange.bind(this);
        this.handleUnitReceiptNoteItemChange = this.handleUnitReceiptNoteItemChange.bind(this);
        this.handleToggleDetail = this.handleToggleDetail.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleRemove() {
        if (this.props.onItemRemove)
            this.props.onItemRemove(this.state.value);
    }

    handleUnitReceiptNoteChange(event, unitReceiptNote) {
        var items = [];
        if (unitReceiptNote != null) {
            for (var item of unitReceiptNote.items) {
                if (item.purchaseOrder.categoryId.toString() === this.state.options.filter.categoryId.toString()) {
                    items.push(item);
                }
            }
            unitReceiptNote.items=items;
            var unitPaymentOrderItem = {
                unitReceiptNoteId: unitReceiptNote._id,
                unitReceiptNote: unitReceiptNote

            };
        }
        var value = this.state.value;
        Object.assign(value, unitPaymentOrderItem);
        this.handleValueChange(value);
    }

    handleUnitReceiptNoteItemChange(unitReceiptNoteItem) {
        var unitPaymentOrderItem = {
            unitReceiptNoteId: unitReceiptNoteItem._id,
            unitReceiptNote: unitReceiptNoteItem
        };
        // var unitReceiptNote = this.state.value;
        // var itemIndex = unitReceiptNote.items.indexOf(unitReceiptNoteItem);
        // var item = unitReceiptNote.items[itemIndex];
        // this.handleUnitReceiptNoteChange(null, unitReceiptNote);
        this.handleUnitReceiptNoteChange(null, unitPaymentOrderItem);
    }

    handleToggleDetail() {
        this.setState({ showDetail: !this.state.showDetail });
    }

    init(props) {
        var showDetail = (this.state || this.props).showDetail || true;
        this.setState({ value: props.value, error: props.error, options: props.options || {}, showDetail: showDetail });
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {

        var removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;
        if (this.state.options.readOnly)
            removeButton = <span></span>;

        var details = null;
        var unitPaymentOrderItem = this.state.value;
        var unitReceiptNote = unitPaymentOrderItem.unitReceiptNote;

        if (this.state.showDetail) {
            var items = unitReceiptNote.items.map((unitReceiptNoteItem, index) => {
                var error = (this.state.error.items || [])[index] || {};
                return (
                    <UnitReceiptNoteItemReact key={`__item_${unitReceiptNote.no}_${unitReceiptNoteItem.product._id}_${index}`} value={unitReceiptNoteItem} error={error} options={this.state.options} onChange={this.handleunitReceiptNoteItemChange} />
                );
            });

            details = <tr>
                <td colSpan="5">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th width="15%">Barang</th>
                                <th width="15%">Jumlah</th>
                                <th width="15%">Satuan</th>
                                <th width="20%">Harga Satuan</th>
                                <th width="24%">Total Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </td>
            </tr>
        }

        var prNoOptions = Object.assign({}, this.state.options, { readOnly: true });
        var style = {
            margin: 0 + 'px'
        }

        return (
            <tr>
                <td colSpan="5">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td width="90%">
                                    <div className={`form-group ${this.state.error.no ? 'has-error' : ''}`}style={style}>
                                        <UnitReceiptNoteAutoSuggestReactBySupplierByUnit value={unitReceiptNote} options={this.state.options} onChange={this.handleUnitReceiptNoteChange} />
                                        <span className="help-block">{this.state.error.no}</span>
                                    </div>
                                </td>
                                <td width="10%">
                                    {removeButton}
                                    <button className="btn btn-info" onClick={this.handleToggleDetail}>i</button>
                                </td>
                            </tr>
                            {details}
                        </tbody>
                    </table>
                </td>
            </tr>
        )
    }
} 