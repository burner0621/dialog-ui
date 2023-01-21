import numeral from 'numeral';

export class DetailFooter {
    controlOptions = {
        label: {
            length: 12,
            align: "right"
        },
        control: {
            length: 0
        }
    }


    activate(context) {
        this.context = context;
    }

    get totalQuantity() {
        const totalQuantity = this.context.items.reduce((acc, cur) => 
        acc += this.quantity(cur.data), 0);
        return totalQuantity;
    }
    
    quantity = (data) => {
        return parseFloat((data.quantity).toFixed(2));
    }

    get error() {
        return this.context.options.error ? this.context.options.error.TotalQtySize : null;
    }
}