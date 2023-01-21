export class footer {

    activate(context) {
        this.context = context;
    }

    get LengthTotal() {
        if (this.context.items) {
            if (this.context.items.length > 0) {
                var qty = this.context.items
                    .map((item) => parseFloat(item.data.Length.toFixed(2)));
                return qty
                    .reduce((prev, curr, index) => { return prev + parseFloat(curr.toFixed(2)) }, 0);
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    get QuantityTotal() {
        if (this.context.items) {
            if (this.context.items.length > 0) {
                var qty = this.context.items
                    .map((item) => parseFloat(item.data.Quantity.toFixed(2)));
                return qty
                    .reduce((prev, curr, index) => { return prev + parseFloat(curr.toFixed(2)) }, 0);
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    // get LengthTotalBefore() {
    //     if (this.context.items) {
    //         if (this.context.items.length > 0) {
    //             var qty = this.context.items
    //                 .map((item) => parseFloat(item.data.LengthBeforeReGrade.toFixed(2)));
    //             return qty
    //                 .reduce((prev, curr, index) => { return prev + parseFloat(curr.toFixed(2)) }, 0);
    //         } else {
    //             return 0;
    //         }
    //     } else {
    //         return 0;
    //     }
    // }

    // get QuantityTotal() {
    //     if (this.context.items) {
    //         if (this.context.items.length > 0) {
    //             var qty = this.context.items
    //                 .map((item) => parseFloat(item.data.Quantity.toFixed(2)));
    //             return qty
    //                 .reduce((prev, curr, index) => { return prev + parseFloat(curr.toFixed(2)) }, 0);
    //         } else {
    //             return 0;
    //         }
    //     } else {
    //         return 0;
    //     }
    // }

    controlOptions = {
        control: {
            length: 12
        }
    };
}