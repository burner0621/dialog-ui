import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'garment-shipping/packing-lists/delivered-sample';

module.exports = function (keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("packing-inventory");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), size: 10, 
        order: {"invoiceNo": "asc"},
        select: JSON.stringify({"invoiceNo":"InvoiceNo","Id":"1"}) })
        .then(results => {
            return results.data.map(invoiceno => {
                invoiceno.toString = function(){
                    return `${this.InvoiceNo}`;
                } 
                return invoiceno;
            })
            ;
        });
}