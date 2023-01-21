import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/instructions';

const empty = {
    name: ''
}

'use strict';

export default class InstructionAutoSuggestReactByFilter extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, InstructionAutoSuggestReactByFilter.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.name}`;
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

InstructionAutoSuggestReactByFilter.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

InstructionAutoSuggestReactByFilter.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (text, filter) {

            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("core");

            return endpoint.find(resource, { keyword: text, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(instruction => {
                        instruction.toString = function () {
                            return `${this.name}`;
                        }
                        return instruction;
                    });
                });
        }
    }
};