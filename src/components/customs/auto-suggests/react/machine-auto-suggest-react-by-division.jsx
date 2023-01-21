import React from 'react';
import AutoSuggestReact from '../../../form/basic/react/auto-suggest-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/machines';

const empty = {
    name: ''
}

'use strict';

export default class MachineAutoSuggestReactByDivision extends AutoSuggestReact {
    constructor(props) {
        super(props);
    }

    init(props) {
        var options = Object.assign({}, MachineAutoSuggestReactByDivision.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.name}`;
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

MachineAutoSuggestReactByDivision.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

MachineAutoSuggestReactByDivision.defaultProps = {
    options: {
        readOnly: false,
        suggestions: function (keyword, divisionFilter) {

            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("core");

            return endpoint.find(resource, { keyword: keyword, division: divisionFilter })
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
