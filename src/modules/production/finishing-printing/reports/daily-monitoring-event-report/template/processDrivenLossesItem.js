import { inject, bindable, computedFrom } from 'aurelia-framework'
export class CartItem {
    @bindable DyeStuffCollections;

    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.readOnly = context.options.readOnly;

        if (this.data.Kanban) {
            this.kanban = this.data.Kanban;
        }

    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    
}