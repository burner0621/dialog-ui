import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("samples/custom-dialog-view/custom-view.html")
export class CustomView {
    constructor(controller) {
        this.controller = controller; 
    }
    
    apiAutoSuggestOptions = {
        suggestions: function (value, filter) {
            return fetch("https://private-50b60-pinkgorilla.apiary-mock.com/activities")
                .then(response => response.json())
                .then(result => {
                    return result.data.map(item => {
                        item.toString = function () {
                            return `${this.title}`;
                        }
                        return item;
                    })
                })
        }
    };

    activate(data) {
        this.data = data;
    }

    save()
    {
        this.controller.ok(this.data);
    }
}