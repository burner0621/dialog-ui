import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'delivery-orders/by-supplier';

module.exports = function(keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("purchasing-azure");

  return endpoint.find(resource, { keyword: keyword, unitId:filter.unitId ,supplierId: filter.supplierId, size: 10 })
                .then(results => {
                    return results.data.map(deliveryOrder => {
                        deliveryOrder.toString = function () {
                            return `${this.no}`;
                        }
                        return deliveryOrder;
                    });
                });
}