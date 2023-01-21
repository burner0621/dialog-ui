import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

module.exports = function(keyword, filter) {
    var data = [
        {"ZonaText":"Prod","ZonaValue":"Prod"},
        {"ZonaText":"Transit","ZonaValue":"Transit"},
        {"ZonaText":"Pack","ZonaValue":"Pack"},
        {"ZonaText":"Gudang Jadi","ZonaValue":"GudangJadi"},
        {"ZonaText":"Ship","ZonaValue":"Ship"},
        {"ZonaText":"Aval","ZonaValue":"Aval"},
        {"ZonaText":"Lab","ZonaValue":"Lab"}
    ]
    return Promise.resolve().then(result => {return data;});
}
