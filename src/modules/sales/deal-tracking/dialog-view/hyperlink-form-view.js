import {inject, useView} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
@useView("./hyperlink-form-view.html")
export class HyperlinkFormView {
    constructor(controller, service) {
        this.controller = controller;
        this.data = {};
        this.error = {};

        this.data.newTab = true;
    }

    save() {
        this.error = {};

        if(!this.data.linkText || this.data.linkText == "") {
            this.error.linkText = "Link Text is required";
        }

        if(!this.data.url || this.data.url == "") {
            this.error.url = "URL is required";
        }
        
        if(Object.getOwnPropertyNames(this.error).length == 0) {
            if (!/^https?:\/\//i.test(this.data.url)) {
                this.data.url = 'http://' + this.data.url;
            }

            this.data.newTab = this.data.newTab ? "_blank" : "";
            this.controller.ok(this.data);
        }
    }
}