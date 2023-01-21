import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const resource = 'delivery-orders/by-supplier';

const empty = {
    no: ''
}

'use strict';

export default class DeliveryOrderAutoSuggestReactBySupplier extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, DeliveryOrderAutoSuggestReactBySupplier.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.no}`;
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

DeliveryOrderAutoSuggestReactBySupplier.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

DeliveryOrderAutoSuggestReactBySupplier.defaultProps = {
    options: {
        readOnly: false,
        suggestions: function (keyword, filter) {
            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("purchasing");

            return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(deliveryOrder => {
                        deliveryOrder.toString = function () {
                            return `${this.no}`;
                        }
                        return deliveryOrder;
                    });
                });
        }
    }
};
