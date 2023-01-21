import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

module.exports = function(keyword, filter) {
    var data = [
        {"MutasiText":"Awal","MutasiValue":"Awal"},
        {"MutasiText":"Masuk","MutasiValue":"Masuk"},
        {"MutasiText":"Keluar","MutasiValue":"Keluar"},
        {"MutasiText":"ADJ Masuk","MutasiValue":"ADJ Masuk"},
        {"MutasiText":"ADJ Keluar","MutasiValue":"ADJ Keluar"}
    ]
    return Promise.resolve().then(result => {return data;});
}
