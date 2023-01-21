import {inject, useView} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Service} from "../service";

var CurrencyLoader = require('../../../../loader/currency-loader');

@inject(DialogController, Service)
@useView("./board-form-view.html")
export class BoardFormView {
    constructor(controller, service) {
        this.controller = controller;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    async activate(params) {
        this.type = params.type;
        
        if(this.type == "Edit") {
            await this.service.getBoardById(params.id)
                .then((result) => {
                    this.data = result;   
                });
        }
    }
    
    save()
    {
        this.error = {};

        if(this.type == "Add") {
            this.service.createBoard(this.data)
                .then((result) => {
                    this.controller.ok();
                })
                .catch(e => {
                    this.error = e;
                });
        }
        else {
            this.service.updateBoard(this.data)
                .then((result) => {
                    this.controller.ok();
                })
                .catch(e => {
                    this.error = e;
                });
        }
    }

    get currencyLoader() {
        return CurrencyLoader;
    }
}