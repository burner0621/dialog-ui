import { inject, bindable, computedFrom } from 'aurelia-framework';
import { months } from '../../../../../node_modules/moment/moment';
var moment = require('moment');
export class DataForm {
    @bindable title;
    @bindable readOnly;

    // itemYears = [];

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };

    constructor(service) {
        this.service = service;

    }
    isRegular = false;
    types = ["PRINTING REAKTIF", "PRINTING REAKTIF RESIST", "PRINTING PIGMENT"];
    clothes = ["Cotton", "Rayon"];
    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }
    sumItem = 0;
    @bindable showDyeStuff = false;

    get totalDetail() {
        if(!this.data.Id || !this.readOnly){
            if (this.data.ColorReceiptItems) {
                this.data.DyeStuffReactives = [];
                this.sumItem = this.data.ColorReceiptItems.reduce((a, b) => +a + +b.Quantity, 0);
                if (this.sumItem > 0) {
                    this.showDyeStuff = true;
                    if (this.data.Type === "PRINTING REAKTIF") {
                        if (this.data.Cloth === "Cotton") {
                            if (0 <= this.sumItem && this.sumItem <= 5) {
                                this.data.DyeStuffReactives.push({
                                    Name: "Urea",
                                    Quantity: 100
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Soda Kue",
                                    Quantity: 20
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 800
                                });
    
                            } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                                this.data.DyeStuffReactives.push({
                                    Name: "Urea",
                                    Quantity: 100
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Soda Kue",
                                    Quantity: 20
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 750
                                });
    
                            } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                                this.data.DyeStuffReactives.push({
                                    Name: "Urea",
                                    Quantity: 150
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Soda Kue",
                                    Quantity: 30
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 700
                                });
    
                            } else {
                                this.data.DyeStuffReactives.push({
                                    Name: "Urea",
                                    Quantity: 150
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Soda Kue",
                                    Quantity: 30
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 650
                                });
    
                            }
                        } else {
                            if (0 <= this.sumItem && this.sumItem <= 5) {
                                this.data.DyeStuffReactives.push({
                                    Name: "Urea",
                                    Quantity: 150
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Soda Kue",
                                    Quantity: 25
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 800
                                });
    
                            } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                                this.data.DyeStuffReactives.push({
                                    Name: "Urea",
                                    Quantity: 150
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Soda Kue",
                                    Quantity: 25
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 750
                                });
    
                            } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                                this.data.DyeStuffReactives.push({
                                    Name: "Urea",
                                    Quantity: 200
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Soda Kue",
                                    Quantity: 30
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 700
                                });
    
                            } else {
                                this.data.DyeStuffReactives.push({
                                    Name: "Urea",
                                    Quantity: 250
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Soda Kue",
                                    Quantity: 30
                                });
    
                                this.data.DyeStuffReactives.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 650
                                });
    
                            }
                        }
                    } else if (this.data.Type === "PRINTING REAKTIF RESIST") {
                        if (0 <= this.sumItem && this.sumItem <= 5) {
                            this.data.DyeStuffReactives.push({
                                Name: "Urea",
                                Quantity: 100
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Soda Kue",
                                Quantity: 20
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Thickener Reaktif",
                                Quantity: 800
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Resist",
                                Quantity: 8
                            });
    
                        } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                            this.data.DyeStuffReactives.push({
                                Name: "Urea",
                                Quantity: 100
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Soda Kue",
                                Quantity: 20
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Thickener Reaktif",
                                Quantity: 750
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Resist",
                                Quantity: 8
                            });
    
                        } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                            this.data.DyeStuffReactives.push({
                                Name: "Urea",
                                Quantity: 150
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Soda Kue",
                                Quantity: 30
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Thickener Reaktif",
                                Quantity: 700
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Resist",
                                Quantity: 8
                            });
    
                        } else {
                            this.data.DyeStuffReactives.push({
                                Name: "Urea",
                                Quantity: 150
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Soda Kue",
                                Quantity: 30
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Thickener Reaktif",
                                Quantity: 650
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Resist",
                                Quantity: 8
                            });
    
                        }
                    } else {
                        if (0 <= this.sumItem && this.sumItem <= 5) {
                            this.data.DyeStuffReactives.push({
                                Name: "Binder",
                                Quantity: 100
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Fixer",
                                Quantity: 10
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Printogen",
                                Quantity: 15
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Luprimol",
                                Quantity: 5
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Thickener Pigment",
                                Quantity: 800
                            });
    
                        } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                            this.data.DyeStuffReactives.push({
                                Name: "Binder",
                                Quantity: 100
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Fixer",
                                Quantity: 10
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Printogen",
                                Quantity: 15
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Luprimol",
                                Quantity: 5
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Thickener Pigment",
                                Quantity: 800
                            });
    
                        } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                            this.data.DyeStuffReactives.push({
                                Name: "Binder",
                                Quantity: 150
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Fixer",
                                Quantity: 10
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Printogen",
                                Quantity: 15
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Luprimol",
                                Quantity: 5
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Thickener Pigment",
                                Quantity: 700
                            });
    
                        } else {
                            this.data.DyeStuffReactives.push({
                                Name: "Binder",
                                Quantity: 200
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Fixer",
                                Quantity: 10
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Printogen",
                                Quantity: 15
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Luprimol",
                                Quantity: 5
                            });
    
                            this.data.DyeStuffReactives.push({
                                Name: "Thickener Pigment",
                                Quantity: 700
                            });
    
                        }
                    }
                    var sumQtyItem = this.data.DyeStuffReactives.reduce((a, b) => +a + +b.Quantity, 0);
                    var waterQty = 1000 - sumQtyItem - this.sumItem;
    
                    this.data.DyeStuffReactives.push({
                        Name: "Air",
                        Quantity: waterQty
                    });
                } else {
                    this.showDyeStuff = false;
                }
            }
        }
        
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.Type) {
            this.type = this.data.Type;
        }

        if(this.data.Id && this.data.DyeStuffReactives){
            this.showDyeStuff = true;
        }
    }

    itemColumns = ["Nama Dye Stuff", "G / KG"];

    addItemCallback = (e) => {
        this.data.ColorReceiptItems = this.data.ColorReceiptItems || [];
        this.data.ColorReceiptItems.push({})
    };
    dyeStuffColumns = [];
    @bindable type;
    typeChanged(n, o) {
        if (this.type) {
            this.data.Type = this.type;
            if (this.data.Type === "PRINTING REAKTIF") {
                this.isRegular = true;
                this.dyeStuffColumns = ["DyeStuff Reaktif", "Total"];
            } else {
                this.isRegular = false;
                if (this.data.Type === "PRINTING REAKTIF RESIST") {
                    this.data.Cloth = "Cotton";
                    this.dyeStuffColumns = ["DyeStuff Reaktif", "Total"];
                } else {
                    this.dyeStuffColumns = ["DyeStuff Pigment", "Total"];
                }
            }
        }
    }
}