import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'production/kanbans';

module.exports = function (keyword, filter, select) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("production-azure");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), select: select, size: 10 })
        .then(results => {
            return results.data.map(kanban => {
                kanban.toString = function () {
                    return [this.ProductionOrder.OrderNo, this.Cart.CartNumber]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
                return kanban;
            })
        });
}