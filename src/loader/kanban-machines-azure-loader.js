import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/machine';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("production-azure");
    return endpoint.find(resource, { keyword: keyword, size: 10 })
        .then(results => {
            let filteredResult = [];

            for (let datum of results.data) {
                console.log(datum);
                let process = filter.Process ? filter.Process : "";
                if (datum.Steps.find((step) => step.Process == process))
                    filteredResult.push(datum);
            }

            return filteredResult;
        });
}
