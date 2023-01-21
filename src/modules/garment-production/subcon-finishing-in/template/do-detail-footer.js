export class DetailFooter {
    activate(context) {
        this.context = context;
    }

    get totalQuantity() {
        const totalQuantity = this.context.items.reduce((acc, cur) =>
            acc += cur.data.Quantity, 0);

        return totalQuantity;
    }
}