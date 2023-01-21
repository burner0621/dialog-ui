import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/divisions/division-group';

module.exports = function (keyword, filter, select) {
  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("core");

  return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), select: select, size: 10 })
    .then(results => {
      return results.data
    });
}
