import React from 'react';
import MachineTypeIndicatorReact from './machine-type-indicator-react.jsx';

'use strict';

export default class MachineTypeIndicatorCollectionReact extends React.Component {
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
            indicator: "",
            dataType: "",
            defaultValue: "",
            uom:"",
   
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
        var readOnlyOptions = this.state.options.isMaster == true ? this.state.options : Object.assign({}, this.state.options, { readOnly: true });
        var items = (this.state.value || []).map(function (item, index) {
            var error = this.state.error[index] || {};
            return (
                <MachineTypeIndicatorReact key={"__item" + index} value={item} error={error} options={this.state.options} onRemove={this.handleItemRemove}></MachineTypeIndicatorReact>
            );
        }.bind(this))

        var addButton = <button className="btn btn-success" onClick={this.handleItemAdd} >+</button>;

        // if (this.state.options.readOnly)
        var table = null;


        if (!this.state.options.isMaster) 
            addButton = <span></span>;
            return (<table className="table table-bordered">
                <thead>
                    <tr>
                        <th width="35%">Indikator</th>
                        <th width="20%">Tipe Data</th>
                        <th width="25%">Petunjuk Data</th>
                        <th width="15%">Satuan</th>
                        <th width="5%">
                            {addButton}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>);
    }
} 