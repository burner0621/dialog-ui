export class SubconDetailFooter {
    activate(context) {
        this.context = context;
    }

    get totalQuantity() {
        const totalQuantity = this.context.items.filter(i => i.data.IsSave).reduce((acc, cur) =>
            acc += cur.data.Quantity, 0);

        return totalQuantity;
    }
}