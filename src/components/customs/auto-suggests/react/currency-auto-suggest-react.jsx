import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const resource = 'master/currencies';

const empty = {
    code: ''
}

'use strict';

export default class CurrencyAutoSuggestReact extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, CurrencyAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.code}`;
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

CurrencyAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

CurrencyAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (keyword, filter) {
            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("core");

            return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(currency => {
                        currency.toString = function () {
                            return `${this.code}`;
                        }
                        return currency;
                    });
                });
        }
    }
};
