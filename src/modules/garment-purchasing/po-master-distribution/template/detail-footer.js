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

    format = "0,000.00";

    activate(context) {
        this.context = context;
    }

    get totalQuantity() {
        const totalQuantity = this.context.items.reduce((acc, cur) => acc += this.convertedQuantity(cur.data), 0);
        return numeral(totalQuantity).format(this.format);
    }
    
    convertedQuantity = (data) => {
        return parseFloat((data.Quantity * data.Conversion).toFixed(2));
    }

    get error() {
        return this.context.options.error ? this.context.options.error.TotalQuantity : null;
    }
}