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

    get totalFinishingOutQuantity() {
        const totalQuantity = this.context.items.reduce((acc, cur) => 
        acc += this.Quantity(cur.data), 0);
        return totalQuantity;
    }
    
    Quantity = (data) => {
        return parseFloat((data.Quantity));
    }

    get error() {
        return this.context.options.error ? this.context.options.error.TotalQuantity : null;
    }
}