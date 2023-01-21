import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'purchase-requests';

const empty = {
    no: ''
}

'use strict';

export default class PurchaseRequestAutoSuggestReact extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, PurchaseRequestAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.no}`;
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

PurchaseRequestAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

PurchaseRequestAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions: function (keyword, filter) {
            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("purchasing");

            return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(pr => {
                        pr.toString = function () {
                            return `${this.no}`;
                        }
                        return pr;
                    });
                });
        }
    }
};
