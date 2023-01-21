export class CartItem {
    activate(context) {
        this.context = context;
        this.Input = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
    }

    cartClicked() {
        if (this.context.context.selectedCart) {
            this.context.context.selectedCart.trCart.removeAttribute("class")
        }

        this.trCart.setAttribute("class", "active");
        this.context.context.selectedCart = { trCart: this.trCart };
        this.contextOptions.reprocessClick(this.cart.reprocess);
    }

    get hank() {
        this.Input.Hank = parseFloat((this.Input.Counter / 9775).toFixed(2));
        return parseFloat((this.Input.Counter / 9775).toFixed(2));
    }

    controlOptions = {
        control: {
            length: 12
        }
    };
}