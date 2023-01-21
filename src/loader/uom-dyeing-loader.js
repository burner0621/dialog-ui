import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/uoms';

module.exports = function (keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("core");
  
  return endpoint.find(resource, { keyword: "MTR", filter: JSON.stringify(filter), size: 10 })
    .then(results => {
      var uomListAll = [];
      results.data.forEach(x=>{
        uomListAll.push(x);
      });
      var uomYARDS = endpoint.find(resource, { keyword: "YARD", filter: JSON.stringify(filter), size: 1 })
      .then(results => {
        results.data.forEach(x=>{
          uomListAll.push(x);
        })
        return results;
      });

      return uomListAll;
    });
}
