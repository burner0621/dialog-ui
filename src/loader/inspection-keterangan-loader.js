import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

module.exports = function(keyword, filter) {
    var data = [
        {"KeteranganText":"OK","KeteranganValue":"OK"},
        {"KeteranganText":"Not OK","KeteranganValue":"NotOK"},
    ]
    return Promise.resolve().then(result => {return data;});
    
}
