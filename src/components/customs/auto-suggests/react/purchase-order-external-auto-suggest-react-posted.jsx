import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'purchase-orders/externals/posted';
const empty = {
    no: '',
    refNo: '',
    toString: function () {
        return '';
    }
}

'use strict';

export default class PurchaseOrderExternalAutoSuggestReactPosted extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, PurchaseOrderExternalAutoSuggestReactPosted.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return [this.no, this.refNo]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

PurchaseOrderExternalAutoSuggestReactPosted.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

PurchaseOrderExternalAutoSuggestReactPosted.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (text, filter) {
            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("purchasing");

            return endpoint.find(resource, { keyword: text, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(poExternal => {
                        poExternal.toString = function () {
                            return [this.no, this.refNo]
                                .filter((item, index) => {
                                    return item && item.toString().trim().length > 0;
                                }).join(" - ");
                        }
                        return poExternal;
                    });
                });
        }
    }
};
