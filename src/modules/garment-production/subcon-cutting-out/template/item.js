export class Item {

    itemsColumns = [
        { header: "Ukuran" },
        { header: "Jumlah Potong" },
        { header: "Satuan Potong" },
        { header: "Keterangan" },
    ];

    // constructor(coreService) {
    //     this.coreService = coreService;
    // }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;

        this.readOnly = context.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.data.TotalCuttingOut = this.isCreate == true ? this.data.RemainingQuantity : this.data.TotalCuttingOut;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            priceTotal: this.data.CuttingInQuantity,
            readOnly: this.readOnly
        };
        this.isShowing = false;
        this.data.TotalCuttingOutQuantity = 0;
        if(this.data.Details){
            if(this.data.Details.length>0){
                this.isShowing = true;
            }
        }
        
        // if (this.data.Product) {
        //     this.dataProduct = `${this.data.Product.Code} - ${this.data.Product.Name}`;
        // }

    }

    get addItems() {
        return (event) => {
            this.data.Details.push({
                ParentProduct: this.data.Product,
                TotalRemainingQuantityCuttingInItem: this.data.TotalCuttingOut ,
                ComodityPrice:this.data.ComodityPrice,
                BasicPrice: this.data.BasicPrice
            })
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            this.itemOptions.error = null;
     };
    }

    toggle() {
        if (!this.isShowing)
          this.isShowing = true;
        else
          this.isShowing = !this.isShowing;
      }

      changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
      }

}