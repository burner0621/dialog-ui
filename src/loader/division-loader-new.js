import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const resource = "master/divisions";

module.exports = function (keyword, filter) {
  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("core");

  return endpoint
    .find(resource, {
      keyword: keyword,
      filter: JSON.stringify(filter),
      size: 10,
    })
    .then((results) => {
      return results.data.map((division) => {
        division.toString = function () {
          return [this.Code, this.Name]
            .filter((item, index) => {
              return item && item.toString().trim().length > 0;
            })
            .join(" - ");
        };
        return division;
      });
    });
};
