import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const resource = "weaving/orders";

module.exports = function (keyword, filter) {
  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("weaving");

  return endpoint
    .find(resource, { keyword: keyword, size: 10 })
    .then(results => {
      return results.data.map(construction => {

        return construction;
      });
    });
};