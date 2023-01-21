import React from 'react';

'use strict';

export default class TextboxReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var initialValue = props.value || TextboxReact.defaultProps.value;
        var placeholder = props.placeholder || TextboxReact.defaultProps.placeholder;
        if (props.value != initialValue && props.onChange)
            props.onChange(initialValue);

        var options = Object.assign({}, TextboxReact.defaultProps.options, props.options);
        this.setState({ value: initialValue, placeholder: placeholder, options: options });
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

        var control = null;
        var usePostFix = this.state.options.postFix.trim() != '';
        
        var postFix = usePostFix ? this.state.options.postFix : '';
        if (this.state.options.readOnly) {
            control = <p className="form-control-static">{this.state.value} {postFix}</p>;
        }
        else {
            control = <input type="text" value={this.state.value} placeholder={this.state.placeholder} onChange={this.handleValueChange} className="form-control"></input>;

            if (this.state.options.postFix.trim() != '') {
                control = <div className="input-group">
                    {control}
                    <span className="input-group-addon">{postFix}</span>
                </div>;
            }
        }
        return control;
    }
}

TextboxReact.propTypes = {
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        postFix: React.PropTypes.string,
    })
};

TextboxReact.defaultProps = {
    value: '',
    placeholder: 'enter value',
    options: {
        readOnly: false,
        postFix: ""
    }
};