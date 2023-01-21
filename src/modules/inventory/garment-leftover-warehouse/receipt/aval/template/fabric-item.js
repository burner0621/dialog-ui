export class Item {

    fabricColumns = [
        { header: "Kode Barang" },
        { header: "Keterangan" },
        { header: "Jumlah Aval" },
        { header: "Satuan" },
    ]

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
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly
        };
        // this.isShowing = false;
        // if(this.data.Details){
        //     if(this.data.Details.length>0){
        //         this.isShowing = true;
        //     }
        // }
        // if(this.isCreate == true){
        //     this.itemsColumns = this.itemsColumnsCreate;
        // }
    }

      changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
      }

}