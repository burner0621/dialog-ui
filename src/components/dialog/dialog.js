import { inject, noView } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from './prompt';
import { ErrorPrompt } from './error-prompt';

@inject(DialogService)
@noView()
export class Dialog {
    constructor(dialogService) {
        this.dialogService = dialogService;
    }

    prompt(message, title) {
        return this.show(Prompt, { title: title, message: message })
            .then(response => {
                var result = "ok";

                if (response.wasCancelled)
                    result = "cancelled";

                return Promise.resolve(result);
            });
    }

    errorPrompt(message, title) {
        return this.show(ErrorPrompt, { message: message })
            .then(response => {
                var result = "ok";

                return Promise.resolve(result);
            });
    }

    show(view, model) {
        return this.dialogService.open({ viewModel: view, model: model });
    }
}