import numeral from 'numeral';

export class ItemDFooter {
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

    get totalPercentage() {
        const totalPercent = this.context.items.reduce((acc, cur) => 
        acc += this.percentage(cur.data), 0);
        return totalPercent;
    }
    
    percentage = (data) => {
        return parseFloat((data.percentage).toFixed(2));
    }

    get totalValue() {
        const totalVal = this.context.items.reduce((acc, cur) =>
        acc += this.value(cur.data), 0);
        return totalVal;
    }

    value = (data) => {
        return parseFloat((data.value).toFixed(4));
    }

    get error() {
        return this.context.options.error ? this.context.options.error.TotalQtySize : null;
    }
}