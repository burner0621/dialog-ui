export class Item {

    itemsColumns = [
        { header: "RO No" },
        { header: "Nomor Referensi PR" },
        { header: "Barang" },
        { header: "Jumlah CC" },
        { header: "Jumlah Pembagian (CC)" },
        { header: "Satuan CC" },
        { header: "Ket. Kelebihan Pemakaian" },
        { header: "Konversi" },
        { header: "Jumlah Pembagian (SJ)" },
        { header: "Satuan" },
    ];

    constructor(coreService) {
        this.coreService = coreService;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;

        this.readOnly = this.options.readOnly;
        this.isEdit = context.context.options.isEdit && this.data.Id > 0;
        this.itemOptions = {
            error: this.error,
            isEdit: this.isEdit,
            priceTotal: this.data.PriceTotal,
        };

        if (this.data.Product) {
            this.dataProduct = `${this.data.Product.Code} - ${this.data.Product.Name}`;
        }

        if (!this.readOnly) {
            this.itemsColumns.push({ header: "" });
        }
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            this.itemOptions.error = null;
     };
    }

}