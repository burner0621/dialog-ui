import {
    Container
  } from "aurelia-dependency-injection";
  import {
    Config
  } from "aurelia-api";
  
  const resource = "weaving/daily-operations-loom/get-loom-beams-used-processed";
  
  module.exports = function (keyword, filter) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("weaving");
  
    return endpoint
      .find(resource, {
        keyword: keyword,
        filter: JSON.stringify(filter),
        size: 10,
        page : 1
      })
      .then(results => {
        return results.data.map(beam => {  
          return beam;
        });
      });
  }
  