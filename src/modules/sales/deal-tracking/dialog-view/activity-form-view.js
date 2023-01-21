import {inject, useView} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Service} from "../service";
import {Dialog} from '../../../../components/dialog/dialog';
import {HyperlinkFormView} from './hyperlink-form-view';

var AccountLoader = require("../../../../loader/account-loader");

@inject(DialogController, Service, Dialog)
@useView("./activity-form-view.html")
export class ActivityFormView {
    constructor(controller, service, dialog) {
        this.controller = controller;
        this.service = service;
        this.dialog = dialog;
        this.data = {};
        this.attachments = [];
        this.error = {};
    }

    async activate(params) {
        this.type = params.type;

        this.formatBytes = params.formatBytes;

        await this.service.getActivityById(params.id)
            .then((result) => {
                this.data = result;

                if (this.type == "NOTES") {
                    this.isNotes = true;
                }
                else {
                    this.data.AssignedTo = { username: this.data.AssignedTo };
                }

                this.currentAttachments = this.data.Attachments;
            });
    }

    uploadFile() {
        var fileUpload = document.getElementById("dialogFileUpload");

        if (fileUpload) {
            for (var file of fileUpload.files) {
                file.newSize = this.formatBytes(file.size);
                this.attachments.push(file);
            }
        }
    }

    deleteAttachment(index) {
        this.attachments.splice(index, 1);
    }

    save() {
        this.error = {};

        if (this.data.Type == "NOTES") {
            if (!this.data.Notes || this.data.Notes === "")
                this.error.Notes = "Notes is required";
            else {
                this.data.attachments = this.attachments;
                this.data.update = true;
                this.data.notes = this.data.Notes;

                this.service.upsertActivityAttachment(this.data)
                    .then((result) => {
                        this.controller.ok(this.data.field);
                    })
                    .catch(e => {
                        this.error = e;
                    });
            }
        }
        else {
            let data = JSON.parse(JSON.stringify(this.data));
            data.AssignedTo = data.AssignedTo.username;

            this.service.updateActivity(data)
                .then((result) => {
                    this.controller.ok(data);
                })
                .catch(e => {
                    this.error = e;
                });
        }
    }

    createHyperlink() {
        this.dialog.show(HyperlinkFormView, {})
            .then(response => {
                if (!response.wasCancelled) {
                    this.data.Notes += `<a href='${response.output.url}' target='${response.output.newTab}'>${response.output.linkText}</a>`;
                }
            });
    }

    get accountLoader() {
        return AccountLoader;
    }
}