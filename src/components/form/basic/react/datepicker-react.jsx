import React from 'react';

'use strict';

export default class DatePickerReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        var _value = props.value === undefined ? props.value : moment(props.value).format('YYYY-MM-DD');
        var options = Object.assign({}, DatePickerReact.defaultProps.options, props.options);
        this.setState({ value: _value || '', options: options });
    }

    handleValueChange(event) {
        event.preventDefault();
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
            var locale = 'id-ID';
            var moment = require('moment');
            moment.locale(locale);
            return (
                <p className="form-control-static">{this.state.value ? moment(new Date(this.state.value)).format(this.state.options.format) : "-" }</p>
            );
        }
        else {
            return (
                <input type="date" value={this.state.value} onChange={this.handleValueChange} className="form-control" min={this.state.options.min} max={this.state.options.max}></input>
            );
        }
    }
}

DatePickerReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool
    })
};
DatePickerReact.defaultProps = {
    options: {
        readOnly: false
    }
};