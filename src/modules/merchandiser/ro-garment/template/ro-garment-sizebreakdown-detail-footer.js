export class ROGarmentSizeBreakdownDetailFooter {
    activate(context) {
        this.context = context;
        this.colspan = this.context.options.readOnly === true ? 2 : 3;
    }

    get totalQuantity() {
        let totalQuantity = 0;
        this.context.items.forEach(item => {
            if (item.data) {
                totalQuantity += Number(item.data.Quantity);
            }
        })
        return totalQuantity;
    }
}