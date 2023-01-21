import { inject, bindable, computedFrom } from 'aurelia-framework'
var KanbanLoader = require('../../../../../loader/kanban-loader');
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

    get kanbanLoader() {
        return KanbanLoader;
    }

    @bindable kanban;
    kanbanChanged(n, o) {
        if (this.kanban) {
            this.data.Kanban = this.kanban;
        } else {
            this.data.Kanban = null;
        }
    }
    kanbanView(kanban) {
        if (kanban.ProductionOrder) {
            return `${kanban.ProductionOrder.OrderNo} - ${kanban.Cart.CartNumber}`;
        }
        else
            return '';
    }

}