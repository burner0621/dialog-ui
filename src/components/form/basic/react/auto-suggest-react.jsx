import React from 'react';
import Autosuggest from 'react-autosuggest';
import '../../../../../styles/auto-suggest-style.css';

'use strict';

export default class AutoSuggestReact extends React.Component {
    constructor(props) {
        super(props);

        this.options = Object.assign({}, this.props.options);

        this.init = this.init.bind(this);
        // Event handlers
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);

        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
    }

    init(props) { 
        var initialValue = (props.value || '');
        // if (props.value != initialValue && props.onChange)
        //     props.onChange(null, initialValue);

        var options = Object.assign({}, AutoSuggestReact.defaultProps.options, props.options);
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [] });
    }

    onFocus(event) { 
        this.text = event.target.value;
    }

    onChange(event, {newValue, method}) { 
        this.setState({ label: newValue });
    }

    onBlur(event, suggestion) { 
        var value = this.text === event.target.value ? this.state.value : suggestion.focusedSuggestion;
        var text = (value || '').toString();
        this.setState({ value: value, label: text });
        // if (this.props.onChange)
        //     this.props.onChange(event, value);
    }

    onSuggestionsFetchRequested({value}) { 
        var suggestions = this.state.options.suggestions;
        var filter = this.state.options.filter ? this.state.options.filter : {};

        Promise.resolve(typeof (suggestions) === "function" ? suggestions(value, filter) : suggestions)
            .then(results => {
                this.setState({ suggestions: results });
            });
    }

    onSuggestionsClearRequested() { 
        this.setState({ suggestions: [] });
    }

    onSuggestionSelected(event, {suggestion, suggestionValue, sectionIndex, method}) { 
        this.text = (suggestion || '').toString();
        this.setState({ value: suggestion });
        if (this.props.onChange)
            this.props.onChange(event, suggestion);
    }

    getSuggestionValue(suggestion) { 
        return (suggestion || '').toString();
    }

    renderSuggestion(suggestion) { 
        var func = this.options.renderSuggestion || function (s) {
            return (<span>{(s || '').toString()}</span>);
        };

        return func(suggestion);
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
            var {value, label, suggestions} = this.state;
            var inputProps = {
                placeholder: '',
                value: label,
                onChange: this.onChange,
                onBlur: this.onBlur,
                onFocus: this.onFocus,
                className: 'form-control'
            }
            return (
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    />
            );
        }
    }
}

AutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

AutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions: []
    }
};
