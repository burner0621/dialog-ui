import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/chart-of-accounts';

module.exports = function (keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("finance");
  return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10 })
    .then(results => {
      return results.data.map(x => {
        return {
          Id: x.Id,
          Name: x.Name,
          No: x.Code,
          Code: x.Code
        };
      });
    });
}