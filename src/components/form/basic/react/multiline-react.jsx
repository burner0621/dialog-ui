import React from 'react';

'use strict';

export default class MultilineReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var initialValue = props.value || '';
        if (props.value != initialValue && props.onChange)
            props.onChange(initialValue);

        var options = Object.assign({}, MultilineReact.defaultProps.options, props.options);
        this.setState({ value: initialValue, options: options });
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
        if (this.state.options.readOnly)
            return (
                <p className="form-control-static">{(this.state.value || '').toString() }</p>
            );
        else
            return (
                <textarea value={this.state.value} onChange={this.handleValueChange} className="form-control" rows={this.state.options.rows} style={{ resize: this.state.options.resize ? "inherit" : "none" }}/>
            );
    }
}

MultilineReact.propTypes = {
    value: React.PropTypes.string,
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        rows: React.PropTypes.number,
        resize: React.PropTypes.bool
    })
};

MultilineReact.defaultProps = {
    value: '',
    options: {
        readOnly: false,
        rows: 3,
        resize: false
    }
};