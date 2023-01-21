import React from 'react';

'use strict';

export default class RadiobuttonReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var selections = props.options.selections.map(item => item.value);
        var defaultValue = selections.find((item, index) => {
            return true;
        });

        var initialValue = props.value == undefined ? defaultValue : props.value;

        if (props.value != initialValue && props.onChange)
            props.onChange(initialValue);

        var options = Object.assign({}, RadiobuttonReact.defaultProps.options, props.options);
        this.setState({ value: initialValue, options: options });
    }

    handleValueChange(event) {
        this.setState({ value: event.target.value });
        if (this.props.onChange)
            this.props.onChange(event.target.value);
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {
        if (this.state.options.readOnly) {
            var selected = this.state.options.selections.find(item => {
                return item.value == this.state.value;
            })
            return (
                <p className="form-control-static">{ (selected || { label: '' }).label }</p>
            );
        }
        else {
            var radios = this.state.options.selections.map((item, index) => {
                return <label key={`__radio_${index}`} className="radio-inline">
                    <input type="radio" value={item.value} checked={item.value == this.state.value} onChange={this.handleValueChange}/>
                    {item.label}
                </label>
            })
            return (
                <div>
                    {radios}
                </div>
            );
        }
    }
}

RadiobuttonReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        selections: React.PropTypes.arrayOf(React.PropTypes.shape({
            value: React.PropTypes.any.isRequired,
            label: React.PropTypes.string
        }))
    })
};
RadiobuttonReact.defaultProps = {
    options: {
        readOnly: false,
        selections: []
    }
};