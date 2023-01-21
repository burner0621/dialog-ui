import React from 'react';

'use strict';

export default class DropdownReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var options = Object.assign({}, DropdownReact.defaultProps.options, props.options);
        var selections = options.selections;
        var defaultValue = selections.find((item, index) => {
            return true;
        })
        var initialValue = props.value || defaultValue;
        if (props.value != initialValue && props.onChange)
            props.onChange(initialValue);

        this.setState({ value: initialValue, options: options });
    }

    handleValueChange(event) { 
        var selectedIndex = event.target.options.selectedIndex;
        var value = this.state.options.selections[selectedIndex];
        event.preventDefault();
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    componentWillMount() { 
        this.init(this.props);
    }

    componentWillReceiveProps(props) { 
        this.init(props);
    }

    render() { 
        if (this.state.options.readOnly)
            return (
                <p className="form-control-static">{(this.state.value || '').toString()}</p>
            );
        else {
            var items = this.state.options.selections.map((item, index) => {
                return (
                    <option key={`__option_${index}`} value={item} data-value={item}>{item.toString()}</option>
                );
            });
            return (
                <select value={this.state.value} onChange={this.handleValueChange} className="form-control" data-value={this.state.value}>
                    {
                        items
                    }
                </select>
            );
        }
    }
}

DropdownReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        selections: React.PropTypes.array
    })
};
DropdownReact.defaultProps = {
    options: {
        readOnly: false,
        selections: []
    }
};