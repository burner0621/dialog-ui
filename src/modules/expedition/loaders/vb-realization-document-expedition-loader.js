import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'vb-realization-expeditions';

module.exports = function (keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("finance");

  return endpoint.find(resource, { keyword: keyword, size: 10, position: 3 })
    .then(results => {
      return results.data
    });

}
