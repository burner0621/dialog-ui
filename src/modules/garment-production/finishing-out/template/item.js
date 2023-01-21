export class Item {


    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.context.options;
        this.data.IsDifferentSize=false;
        this.readOnly = context.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            isEdit:this.isEdit,
            priceTotal: this.data.CuttingInQuantity,
            readOnly: this.readOnly
        };
        this.isShowing = false;
        if(this.data.Details){
            if(this.data.Details.length>0){
                this.isShowing = true;
            }
        }
        

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