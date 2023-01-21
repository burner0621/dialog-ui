import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'garment-shipping/draft-packing-list-items';

module.exports = function (keyword, filter) {

	var config = Container.instance.get(Config);
	var endpoint = config.getEndpoint("packing-inventory");

	return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 20 })
		.then(results => {
			return results.data;
		});
}