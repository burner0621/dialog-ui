export class CartItem {
  activate(context) {
    this.context = context;
    this.cart = context.data;
    this.error = context.error;
    this.options = context.options;
    this.contextOptions = context.context.options;
    this.isLanjutProses = this.cart.reprocess == "Lanjut Proses";
  } 

  cartClicked() {
    if(this.context.context.selectedCart) {
      this.context.context.selectedCart.trCart.removeAttribute("class")
    }

    this.trCart.setAttribute("class", "active");
    this.context.context.selectedCart = { trCart: this.trCart };
    this.contextOptions.reprocessClick(this.cart.reprocess);
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}