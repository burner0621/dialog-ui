import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const resource = 'accounts';

const empty = {
    profile : {},
    toString: function () {
        return '';
    }
}

'use strict';

export default class AccountAutoSuggestReact extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, AccountAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return [this.profile.firstname, this.profile.lastname]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" ");
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}


AccountAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

AccountAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (keyword, filter) {
            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("auth");
            var selectField = ["_id", "username", "isLocked", "profile", "roles"];

            return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), select : selectField })
                .then(results => {
                    return results.data.map(account => {
                        account.toString = function () {
                            return [this.profile.firstname, this.profile.lastname]
                                .filter((item, index) => {
                                    return item && item.toString().trim().length > 0;
                                }).join(" ");
                        }
                        return account;
                    })
                })
        }
    }
};
