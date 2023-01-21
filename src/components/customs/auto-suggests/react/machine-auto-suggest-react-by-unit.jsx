import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'spinning/winding/machine-by-units';

const empty = {
    name: ''
}

'use strict';

export default class MachineAutoSuggestReactByUnit extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, MachineAutoSuggestReactByUnit.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.name}`;
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

MachineAutoSuggestReactByUnit.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

MachineAutoSuggestReactByUnit.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (text, filter) {

            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("production");

            return endpoint.find(resource, { keyword: text, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(machine => {
                        machine.toString = function () {
                            return `${this.name}`;
                        }
                        return machine;
                    });
                });
        }
    }
};
