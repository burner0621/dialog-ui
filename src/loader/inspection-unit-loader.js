import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

module.exports = function(keyword, filter) {
    var data = [
        {"UnitText":"Dyeing","UnitValue":"Dyeing"},
        {"UnitText":"Printing","UnitValue":"Masuk"}
    ]
    return Promise.resolve().then(result => {return data;});
}
