import { inject } from 'aurelia-framework';
import { Dialog } from '../components/dialog/dialog';
import { CustomView } from './custom-dialog-view/custom-view';


@inject(Dialog)
export class FormControls {
    constructor(dialog) {
        this.dialog = dialog;
    }
    data = {};

    staticAutoSuggestOptions = {
        suggestions: ["A", "B", "C", "D"]
    };

    natives = [2, 3, 4, 5, 6];
    objects = [{ text: "Zero", value: 0 }, { text: "One", value: 1 }]

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

    showData() {
        console.log(this.data);
    }

    dialogPrompt() {
        this.dialog.prompt("prompt title", "prompt message")
            .then(response => {
                console.log(response);
            });
    }

    dialogShow() {
        this.dialog.show(CustomView, {})
            .then(response => {
                console.log(response);
            });
    }
}