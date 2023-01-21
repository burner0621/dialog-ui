import {inject, useView} from 'aurelia-framework';
import {Service} from "../service";
import {DialogController} from 'aurelia-dialog';

@inject(DialogController, Service)
@useView("./stage-form-view.html")
export class StageFormView {
    constructor(controller, service) {
        this.controller = controller;
        this.service = service;

        this.data = {};
        this.error = {};
    }

    async activate(params) {
        this.type = params.type;

        if(this.type == "Add") {
            this.data.boardId = params.id;
        }
        else {
            await this.service.getStageById(params.id)
                .then((result) => {
                    this.data = result;   
                });
        }
    }

    save()
    {
        this.error = {};

        if(this.type == "Add") {
            this.service.createStage(this.data)
                .then(response => {
                    this.controller.ok();
                })
                .catch(e => {
                    this.error = e;
                });
        }
        else {
            this.service.updateStage(this.data)
                .then(response => {
                    this.controller.ok({ name: this.data.Name });
                })
                .catch(e => {
                    this.error = e;
                });
        }
    }
}