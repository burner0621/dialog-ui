import React from 'react';
import ProductionOrderDetailReact from './production-order-detail-react.jsx';
import NumericReact from '../../../form/basic/react/numeric-react.jsx'; 
import UomAutoSuggestReact from '../../auto-suggests/react/uom-auto-suggest-react.jsx'; 

'use strict';

export default class ProductionOrderDetailCollectionReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);

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
            colorType: { toString: function () { return '' } },
            colorTypeId: { toString: function () { return '' } },
            uom: { toString: function () { return '' } },
            uomId: { toString: function () { return '' } },
            colorRequest: '',
            colorTemplate: '',
            quantity: 0
        };
        this.state.value.push(newItem);
        this.setState({ value: this.state.value });

        if (this.props.onAddItem)
            this.props.onAddItem(newItem);
    }

    handleItemChange(item) {
        var i = this.state.value[0] == item;
        this.setState({ value: this.state.value });
        
    }

    handleItemRemove(item) {
        var itemIndex = this.state.value.indexOf(item);
        this.state.value.splice(itemIndex, 1);
        this.setState({ value: this.state.value });
    }

    
    render() {
        var readOnlyOptions = { readOnly: true };
        var items = (this.state.value || []).map(function (item, index) {
            var error = this.state.error[index] || {};
            return (
                <ProductionOrderDetailReact key={"__item" + index} value={item} error={error} options={this.state.options} onChange={this.handleItemChange} onRemove={this.handleItemRemove}></ProductionOrderDetailReact>
            );
        }.bind(this))
        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd}>+</button>;
        var sumQty=0;
        var uom="";
        var error="";
        for(var x=0;x<this.state.value.length;x++){
            sumQty+=this.state.value[x].quantity;
            uom=this.state.value[x].uom;
            if(this.state.error[x]!=undefined)
            {
                error=this.state.error[x].total;
            }
        }
        var style = {
            margin: 0 + 'px'
        }
        if (this.state.options.readOnly || this.state.options.filter == null)
            addButton = <span></span>;
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th width="25%">Acuan Warna/Desain</th>
                        <th width="25%">Warna yang Diminta</th>
                        { this.state.options.printing ?
                            <th width="30%" className="hidden">Jenis Warna</th>:
                            <th width="30%">Jenis Warna</th>
                        }
                        <th width="14%">Jumlah</th>
                        <th width="6%">Satuan</th>
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
                <tfoot>
                    <tr>
                        { this.state.options.printing ?
                        <th colSpan="2">
                            <div className="form-group" style={style}>Total</div>
                        </th> :
                        <th colSpan="3">
                            <div className="form-group" style={style}>Total</div>
                        </th>
                        }
                        <td>
                            <div className={`form-group ${error ? 'has-error' : ''}`} style={style}>
                                <NumericReact value={sumQty} options={readOnlyOptions} onChange={this.handleItemChange} />
                                <span className="help-block">{error}</span>
                            </div>
                        </td>
                        <td>
                            <div className="form-group" style={style} >
                                <UomAutoSuggestReact value={uom || ''} options={readOnlyOptions} />
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        )
    }
} 