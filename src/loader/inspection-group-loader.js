import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

module.exports = function(keyword, filter) {
    var data = [
        {"GroupText":"Pagi","GroupValue":"Pagi"},
        {"GroupText":"Siang","GroupValue":"Siang"},
    ]
    return Promise.resolve().then(result => {return data;});
}
