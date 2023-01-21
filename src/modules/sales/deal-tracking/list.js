import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Dialog} from '../../../components/dialog/dialog';
import {BoardFormView} from './dialog-view/board-form-view';
import {Service} from "./service";

@inject(Router, Dialog, Service)
export class List {
    constructor(router, dialog, service) {
        this.router = router;
        this.dialog = dialog;
        this.service = service;

        this.getData();
	}

    getData() {
        var arg = {
            select: ["title"]
        };

        this.service.searchBoard(arg)
            .then((result) => {
                this.data = result.data;
            });
    }

    list(id) {
        this.router.navigateToRoute('board', { id: id });
    }

    create() {
        this.dialog.show(BoardFormView, { type: "Add" })
            .then(response => {
                    if (!response.wasCancelled) {
                        this.getData();
                    }
                });
    }
}