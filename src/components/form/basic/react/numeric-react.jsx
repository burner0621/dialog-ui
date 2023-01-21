import React from 'react';
import DynamicNumber from 'react-dynamic-number';

'use strict';

const defaultPlaceholder = 'enter value';

export default class NumericReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    init(props) {
        var initialValue = props.value;
        if (props.value != initialValue && props.onChange) {
            props.onChange(initialValue);
        }
        var placeholder = props.placeholder || NumericReact.defaultProps.placeholder;
        var options = Object.assign({}, NumericReact.defaultProps.options, props.options);
        this.setState({ value: initialValue, placeholder: placeholder, options: options });
    }

    handleValueChange(event, modelValue, viewValue) {
        event.preventDefault();
        var value = modelValue;// parseInt(event.target.value);
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    componentWillMount() {
        var initialValue = this.props.value;
        if (!initialValue && this.props.placeholder === defaultPlaceholder)
            initialValue = 0;

        var placeholder = this.props.placeholder || NumericReact.defaultProps.placeholder;
        if (this.props.value != initialValue && this.props.onChange) {
            this.props.onChange(initialValue);
        }

        var options = Object.assign({}, NumericReact.defaultProps.options, this.props.options);
        this.setState({ value: initialValue, placeholder: placeholder, options: options });
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
            control = <DynamicNumber className="form-control" value={this.state.value} placeholder={this.state.placeholder} onChange={this.handleValueChange}
                separator={this.state.options.separator}
                integer={this.state.options.integer}
                fraction={this.state.options.fraction}
                negative={this.state.options.negative}
                positive={this.state.options.positive}
                thousand={this.state.options.thousand} />

            if (this.state.options.postFix.trim() != '') {
                control = <div className="input-group">
                    {control}
                    <span className="input-group-addon">{postFix}</span>
                </div>;
            }
        }
        return control;


        // var control = null;
        // var usePostFix = this.state.options.postFix.trim() != '';
        // var postFix = usePostFix ? this.state.options.postFix : '';
        // if (this.state.options.readOnly) {
        //     control = <p className="form-control-static">{ parseFloat(this.state.value).toLocaleString() } {postFix}</p>;
        // }
        // else {
        //     // control = <input type="number" value={this.state.value} onChange={this.handleValueChange} className="form-control" min={this.state.options.min} max={this.state.options.max instanceof Number ? this.state.options.max : "" } style={{ textAlign: "right" }}></input>;
        //     control = <DynamicNumber className="form-control" value={this.state.value} onChange={this.handleValueChange}
        //         separator={this.state.options.separator}
        //         integer={this.state.options.integer}
        //         fraction={this.state.options.fraction}
        //         negative={this.state.options.negative}
        //         positive={this.state.options.positive}
        //         thousand={this.state.options.thousand} />

        //     if (this.state.options.postFix.trim() != '') {
        //         control = <div className="input-group">
        //             {control}
        //             <span className="input-group-addon">{postFix}</span>
        //         </div>;
        //     }
        // }

        // return control;
    }
}

NumericReact.propTypes = {
    value: React.PropTypes.number,
    placeholder: React.PropTypes.string, 
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        postFix: React.PropTypes.string,
        separator: React.PropTypes.string,
        interger: React.PropTypes.number,
        fraction: React.PropTypes.number,
        negative: React.PropTypes.bool,
        positive: React.PropTypes.bool,
        thousand: React.PropTypes.bool,
    })
};

NumericReact.defaultProps = {
    placeholder: defaultPlaceholder,
    options: {
        readOnly: false,
        min: 0,
        postFix: "",
        separator: ".",
        integer: 20,
        fraction: 15,
        negative: true,
        positive: true,
        thousand: true,
    }
};