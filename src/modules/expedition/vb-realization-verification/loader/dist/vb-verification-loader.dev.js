"use strict";

var _aureliaDependencyInjection = require("aurelia-dependency-injection");

var _aureliaApi = require("aurelia-api");

var resource = 'vb-realization-documents';

module.exports = function (keyword, filter) {
  var config = _aureliaDependencyInjection.Container.instance.get(_aureliaApi.Config);

  var endpoint = config.getEndpoint("finance");
  return endpoint.find(resource, {
    keyword: keyword,
    size: 10,
    filter: JSON.stringify(filter)
  }).then(function (results) {
    return results.data;
  });
};