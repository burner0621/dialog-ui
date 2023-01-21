import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const resource = "weaving/beams";
const movement = "weaving/movements/beam";

module.exports = function (keyword, filter) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("weaving");

    return endpoint
        .find(resource, { keyword: keyword, size: 10 })
        .then(results => {
            var beams = results.data;

            return endpoint.find(movement)
                .then(movementResult => {
                    var beamsAsResult = [];
                    var movementBeams = movementResult.data;

                    for (var beam of beams) {
                        var index = 0;

                        for (var move of movementBeams) {

                            if (beam.Number == move.BeamNumber) {
                                index++;
                            }
                        }

                        if (index == 0) {
                            beamsAsResult.push(beam)
                        }
                    }

                    //Only Return Beam has not used
                    return beamsAsResult;
                });;

        });
};