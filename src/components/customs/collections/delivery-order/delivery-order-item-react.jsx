import React from 'react';

import PurchaseOrderExternalAutoSuggestReactPosted from '../../auto-suggests/react/purchase-order-external-auto-suggest-react-posted.jsx';
import DeliveryOrderItemFulfillmentReact from './delivery-order-item-fulfillment-react.jsx';

'use strict';

export default class DeliveryOrderItemReact extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleItemFulfillmentRemove = this.handleItemFulfillmentRemove.bind(this);
        this.handleToggleDetail = this.handleToggleDetail.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }

    handleValueChange(event, poExternal) {
        var doItem = this.state.value;
        doItem.purchaseOrderExternal = poExternal;
        doItem.fulfillments = [];
        doItem.purchaseOrderExternalId = poExternal ? poExternal._id : {};
        this.setState({ value: doItem });
        if (this.props.onChange)
            this.props.onChange(doItem);
    }

    handleItemFulfillmentRemove(fulfillment) {
        var itemIndex = this.state.value.fulfillments.indexOf(fulfillment);
        this.state.value.fulfillments.splice(itemIndex, 1);
        this.setState({ value: this.state.value });
        // if (this.props.onChange)
        //     this.props.onChange(this.state.value);
    }

    handleRemove() {
        if (this.props.onRemove)
            this.props.onRemove(this.state.value);
        // if (this.props.onItemRemove)
        //     this.props.onItemRemove(this.state.value);
    }

    handleToggleDetail() {
        this.setState({ showDetail: !this.state.showDetail });
    }

    init(props) {
        var value = props.value;
        var doFulfillments = value.fulfillments || [];
        var poExternal = value.purchaseOrderExternal || {};
        var poCollection = poExternal.items || [];
        var fulfillments = [];
        for (var purchaseOrder of poCollection) {
            for (var poItem of purchaseOrder.items) {
                var correctionQty = [];
                poItem.fulfillments.map((fulfillment) => {
                    if (fulfillment.correction) {
                        fulfillment.correction.map((correction) => {
                            if (correction.correctionRemark == "Koreksi Jumlah") {
                                correctionQty.push(correction.correctionQuantity < 0 ? correction.correctionQuantity * -1 : correction.correctionQuantity)
                            }
                        })
                    }
                })

                var isQuantityCorrection = correctionQty.length > 0;

                if ((poItem.dealQuantity - poItem.realizationQuantity) > 0) {
                    var deliveredQuantity = (doFulfillments[fulfillments.length] || {}).deliveredQuantity ? doFulfillments[fulfillments.length].deliveredQuantity : (poItem.dealQuantity - poItem.realizationQuantity);
                    var remainingQuantity = poItem.dealQuantity - poItem.realizationQuantity;
                    if (isQuantityCorrection) {
                        deliveredQuantity += correctionQty.reduce((prev, curr) => prev + curr);;
                        remainingQuantity += correctionQty.reduce((prev, curr) => prev + curr);;
                    }
                    var fulfillment = {
                        purchaseOrderId: purchaseOrder._id,
                        purchaseOrder: purchaseOrder,
                        productId: poItem.product._id,
                        product: poItem.product,
                        purchaseOrderQuantity: poItem.dealQuantity,
                        purchaseOrderUom: poItem.dealUom,
                        remainingQuantity: remainingQuantity,
                        deliveredQuantity: deliveredQuantity,
                        remark: (doFulfillments[fulfillments.length] || {}).remark ? doFulfillments[fulfillments.length].remark : ''
                    };
                    fulfillments.push(fulfillment);
                }
                else if (isQuantityCorrection) {
                    var fulfillment = {
                        purchaseOrderId: purchaseOrder._id,
                        purchaseOrder: purchaseOrder,
                        productId: poItem.product._id,
                        product: poItem.product,
                        purchaseOrderQuantity: poItem.dealQuantity,
                        purchaseOrderUom: poItem.dealUom,
                        remainingQuantity: poItem.dealQuantity + correctionQty[correctionQty.length - 1],
                        deliveredQuantity: (doFulfillments[fulfillments.length] || {}).deliveredQuantity ? doFulfillments[fulfillments.length].deliveredQuantity : (poItem.dealQuantity - poItem.realizationQuantity) + correctionQty.reduce((prev, curr) => prev + curr),
                        remark: (doFulfillments[fulfillments.length] || {}).remark ? doFulfillments[fulfillments.length].remark : ''
                    };
                    fulfillments.push(fulfillment);
                }
            }
        }

        value.fulfillments = doFulfillments.length > 0 ? doFulfillments : fulfillments;

        if (doFulfillments.length > 0) {
            if (props.options.isEdit) {
                for (var fulfillment of doFulfillments) {
                    var poItem = fulfillment.purchaseOrder.items.find((_poItem) => _poItem.product._id.toString() === fulfillment.product._id.toString());
                    var qty = 0;
                    if (poItem) {
                        qty = poItem.fulfillments
                            .map((fulfillment) => fulfillment.deliveryOrderDeliveredQuantity)
                            .reduce((prev, curr, index) => {
                                if (index === (poItem.fulfillments.length - 1)) {
                                    return prev + 0
                                } else {
                                    return prev + curr
                                }
                            }, 0);
                    }
                    fulfillment.remainingQuantity = poItem.dealQuantity - qty;
                }
            } else {
                for (var fulfillment of doFulfillments) {
                    for (poItem of fulfillment.purchaseOrder.items) {
                        if (poItem.product._id.toString() === fulfillment.product._id.toString()) {
                            fulfillment.remainingQuantity = poItem.dealQuantity - poItem.realizationQuantity;
                            break;
                        }
                    }
                }
            }
            value.fulfillments = doFulfillments;
        } else {
            value.fulfillments = fulfillments;
        }

        var error = Object.assign({}, DeliveryOrderItemReact.defaultProps.error, props.error);
        var options = Object.assign({}, DeliveryOrderItemReact.defaultProps.options, props.options);
        var showDetail = (this.state || this.props).showDetail || true;

        this.setState({ value: value, error: error, options: options, showDetail: showDetail });
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }


    render() {
        this.options = { readOnly: (this.readOnly || '').toString().toLowerCase() === 'true' };
        var details = null;
        var removeButton = <button className="btn btn-danger" onClick={this.handleRemove}>-</button>;
        if (this.state.options.readOnly)
            removeButton = <span></span>;

        if (this.state.showDetail) {
            var items = this.state.value.fulfillments.map((fulfillment, index) => {
                var itemOptions = { readOnly: true };
                var realizationQtyOptions = { readOnly: false };
                var error = (this.state.error.fulfillments || [])[index] || {};
                return <DeliveryOrderItemFulfillmentReact key={`__item_${fulfillment.purchaseOrder.no}_${fulfillment.product._id}_${index}`} value={fulfillment} error={error} options={this.state.options} onItemFulfillementRemove={this.handleItemFulfillmentRemove} />;
            });

            details = <tr>
                <td colSpan="5">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th width="20%">Nomor PR</th>
                                <th width="20%">Barang</th>
                                <th width="10%">Dipesan</th>
                                <th width="10%">Satuan</th>
                                <th width="10%">Diterima</th>
                                <th width="20%">Catatan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </td>
            </tr>
        }

        return (
            <tr>
                <td colSpan="5">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td width="90%">
                                    <div className={`form-group ${this.state.error.purchaseOrderExternal ? 'has-error' : ''}`}>
                                        <PurchaseOrderExternalAutoSuggestReactPosted value={this.state.value.purchaseOrderExternal} options={this.state.options} onChange={this.handleValueChange} />
                                        <span className="help-block">{this.state.error.purchaseOrderExternal}</span>
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

DeliveryOrderItemReact.propTypes = {
    value: React.PropTypes.object,
    error: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.string]),
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool
    })
};

DeliveryOrderItemReact.defaultProps = {
    value: {},
    error: {},
    options: {
        readOnly: false,
    }
};
