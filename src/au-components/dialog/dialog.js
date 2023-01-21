import { inject, noView } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from './prompt';

@inject(DialogService)
@noView()
export class Dialog {
    constructor(dialogService) {
        this.dialogService = dialogService;
    }

    prompt(message, title) {
        return this.show(Prompt, { title: title, message: message })
            .then(response => {
                return Promise.resolve({ ok: !response.wasCancelled });
            });
    }

    show(view, model) {
        return this.dialogService.open({ viewModel: view, model: model });
    }
}