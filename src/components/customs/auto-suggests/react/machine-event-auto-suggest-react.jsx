import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const resource = 'master/machine-events';

const empty = {
    no: '',
    name: '',
    toString: function () {
        return '';
    }
}

'use strict';

export default class MachineEventAutoSuggestReact extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, MachineEventAutoSuggestReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return [this.no, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}


MachineEventAutoSuggestReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

MachineEventAutoSuggestReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (keyword, machineCodeFilter) {
            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("core");
            return endpoint.find(resource, { keyword: keyword, machineCode: machineCodeFilter })
                .then(results => {
                    return results.data.map(machineEvent => {
                        machineEvent.toString = function () {
                            return [this.no, this.name]
                                .filter((item, index) => {
                                    return item && item.toString().trim().length > 0;
                                }).join(" - ");
                        }
                        return machineEvent;
                    })
                })
        }
    }
};