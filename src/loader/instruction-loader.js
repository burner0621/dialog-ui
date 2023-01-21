import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/instructions';

module.exports = function (keyword, filter, select) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("production-azure");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), select: select, size: 10 })
        .then(results => {
            return results.data.map(instruction => {
                instruction.toString = function () {
                    return `${this.name}`;
                }
                return instruction;
            });
        });
}
