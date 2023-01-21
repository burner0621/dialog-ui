import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'finishing-printing/kanbans';

const empty = {
    productionOrder: {
        orderNo : ''
    },
    cart : {
        cartNumber : ''
    },
    toString: function () {
        return '';
    }
}

'use strict';

export default class KanbanAutoSuggestReact extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, KanbanAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return [this.productionOrder.orderNo, this.cart.cartNumber]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

KanbanAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

KanbanAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions: function (keyword, filter) {

            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("production");

            return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(kanban => {
                        kanban.toString = function () {
                            return [this.productionOrder.orderNo, this.cart.cartNumber]
                                .filter((item, index) => {
                                    return item && item.toString().trim().length > 0;
                                }).join(" - ");
                        };
                        return kanban;
                    });
                });
        }
    }
};