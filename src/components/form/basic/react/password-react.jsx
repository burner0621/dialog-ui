import React from 'react';

'use strict';

export default class PasswordReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var initialValue = props.value || PasswordReact.defaultProps.value;
        if (props.value != initialValue && props.onChange)
            props.onChange(initialValue);

        var options = Object.assign({}, PasswordReact.defaultProps.options, props.options);
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

        var control = null;
        var usePostFix = this.state.options.postFix.trim() != '';
        
        var postFix = usePostFix ? this.state.options.postFix : '';
        if (this.state.options.readOnly) {
            control = <p className="form-control-static">{this.state.value} {postFix}</p>;
        }
        else {
            control = <input type="text" value={this.state.value} onChange={this.handleValueChange} className="form-control"></input>;

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

PasswordReact.propTypes = {
    value: React.PropTypes.string,
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        postFix: React.PropTypes.string
    })
};

PasswordReact.defaultProps = {
    value: '',
    options: {
        readOnly: false,
        postFix: ""
    }
};