export class Detail {
    activate(context) {
        this.data = context.data;
        this.data.productNameView = this.data.ProductCode +' - '+ this.data.ProductName ;
    }
}