export class Item {

    itemsColumns = [
        { header: "Ukuran" },
        { header: "Jumlah" }
    ];

    // constructor(coreService) {
    //     this.coreService = coreService;
    // }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;

        this.data.IsDifferentSize=true;
        this.readOnly = context.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        if(this.isEdit){
            this.readOnly=false;
        }
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            isEdit: this.isEdit,
            readOnly: this.readOnly
        };
        this.isShowing = false;
        this.data.TotalQuantity = 0;
        if(this.data.Details){
            if(this.data.Details.length>0){
                this.isShowing = true;
            }
        }
        this.data.TotalCuttingOut = this.isCreate == true ? this.data.RemainingQuantity : this.data.TotalQuantity;
    }

    get addItems() {
        return (event) => {
            this.data.Details.push({
                ParentProduct: this.data.Product,
                TotalRemainingQuantityItem: this.data.Total ,
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
    
    get qty(){
        this.data.Quantity=0;
        if(this.data.Details){
            for(var detail of this.data.Details){
                if(detail.Quantity){
                    this.data.Quantity+=detail.Quantity;
                }
            }
        }
        return this.data.Quantity;
    }
}