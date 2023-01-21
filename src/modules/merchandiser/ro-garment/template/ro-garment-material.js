export class ROGarmentMaterial {

    controlOptions = {
        control: {
            length: 12
        }
    };

    async activate(context) {
        this.context = context;
        this.data = this.context.data;
        this.options = this.context.options;
        this.readOnly = this.options.readOnly;
        this.disabled = true;
        this.subCategory = this.data.Category && this.data.Category.SubCategory ? this.data.Category.SubCategory : "";
        this.quantity = this.data.Quantity !== undefined || this.data.Quantity !== null ? this.data.Quantity : 0;
        this.uom = this.data.UOMQuantity && this.data.UOMQuantity.Unit ? this.data.UOMQuantity.Unit : "";
        this.quantityText = this.quantity + " " + this.uom;
    }
}
