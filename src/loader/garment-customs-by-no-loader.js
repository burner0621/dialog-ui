import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'beacukaitemps';

module.exports = function (keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("customs-report");
  //   var order={
  //       "TglBCNo":"desc"
  //   };
  console.log(keyword);
  return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(""), size: 10 })
    .then(results => {
      return results.data
    });
}
