import { inject, bindable, computedFrom } from 'aurelia-framework'
var ColorReceiptLoader = require('../../../../../loader/color-receipt-loader');

export class CartItem {
    @bindable DyeStuffCollections;
    listTypeOptions = {};
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.Type = this.contextOptions.Type;
        this.Cloth = this.contextOptions.Cloth;
        // this.subType = this.contextOptions.SubType;
        // console.log(this.subType);
        this.readOnly = this.options.readOnly;
        this.listTypeOptions = {
            type: this.Type,
            
          };


        if (this.data.Id && this.data.ChemicalItems) {
            this.showChemical = true;
        }

        if (this.Type == "PRINTING REAKTIF"){

            this.dyeStuffColumns = ["Dye Stuff", "SUB REAKTIF", "G/KG" ];
        }else{
            this.dyeStuffColumns = ["Dye Stuff", "G/KG" ];
        }

        
        
    this.chemicalColumns = ["Chemical", "G/KG"];

    }

    chemicalOptions = {};
    controlOptions = {
        control: {
            length: 12
        }
    };

    
    
    get colorReceiptLoader() {
        return ColorReceiptLoader;
    }

    addItemCallback = (e) => {
        this.data.DyeStuffItems = this.data.DyeStuffItems || [];
        console.log(this.data.DyeStuffItems);
        this.data.DyeStuffItems.push({})
    };

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    get totalDyeStuff() {
        if (this.data.DyeStuffItems) {
            return this.data.DyeStuffItems.reduce((a, b) => +a + +b.Quantity, 0);
        } else {
            return 0;
        }
    }

    get totalChemical() {
        if (this.data.ChemicalItems) {
            return this.data.ChemicalItems.reduce((a, b) => +a + +b.Quantity, 0);
        } else {
            return 0;
        }
    }

    showChemical = false;

    @computedFrom("totalChemical")
    get viscositasNumber() {
        if (!this.data.Id || !this.readOnly) {
            if (this.data.ChemicalItems && this.data.ChemicalItems.length > 0) {
                return this.data.ChemicalItems[this.data.ChemicalItems.length - 1].Quantity;
            }
        }

    }

    @computedFrom("totalDyeStuff")
    get totalDetail() {
        if (!this.data.Id || !this.readOnly) {
            if (this.data.DyeStuffItems && this.data.DyeStuffItems.length > 0) {
                var vNum = this.viscositasNumber;
                this.data.ChemicalItems = [];
                let idx = 0;
                this.sumItem = this.data.DyeStuffItems.reduce((a, b) => +a + +b.Quantity, 0);
                this.subType = this.data.DyeStuffItems.reduce(
                    (acc, curr) => acc && curr.SubType,
                    true
                  );
                console.log(this.subType);
                console.log(this.sumItem);
                if (this.sumItem > 0) {
                    this.showChemical = true;
                    if (this.Type === "PRINTING REAKTIF") {
                        //reaktif
                        if (this.subType ==="REAKTIF"){
                            if (this.Cloth === "Cotton") {
                                if (0 <= this.sumItem && this.sumItem <= 5) {
                                    this.data.ChemicalItems.push({
                                        Name: "Urea",
                                        Quantity: 100,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Soda Kue",
                                        Quantity: 20,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Thickener Reaktif",
                                        Quantity: 800,
                                        Index: idx++
                                    });
    
                                } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                                    this.data.ChemicalItems.push({
                                        Name: "Urea",
                                        Quantity: 100,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Soda Kue",
                                        Quantity: 20,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Thickener Reaktif",
                                        Quantity: 750,
                                        Index: idx++
                                    });
    
                                } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                                    this.data.ChemicalItems.push({
                                        Name: "Urea",
                                        Quantity: 150,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Soda Kue",
                                        Quantity: 30,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Thickener Reaktif",
                                        Quantity: 700,
                                        Index: idx++
                                    });
    
                                } else {
                                    this.data.ChemicalItems.push({
                                        Name: "Urea",
                                        Quantity: 150,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Soda Kue",
                                        Quantity: 30,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Thickener Reaktif",
                                        Quantity: 650,
                                        Index: idx++
                                    });
    
                                }
                            } else {
                                if (0 <= this.sumItem && this.sumItem <= 5) {
                                    this.data.ChemicalItems.push({
                                        Name: "Urea",
                                        Quantity: 150,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Soda Kue",
                                        Quantity: 25,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Thickener Reaktif",
                                        Quantity: 800,
                                        Index: idx++
                                    });
    
                                } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                                    this.data.ChemicalItems.push({
                                        Name: "Urea",
                                        Quantity: 150,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Soda Kue",
                                        Quantity: 25,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Thickener Reaktif",
                                        Quantity: 750,
                                        Index: idx++
                                    });
    
                                } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                                    this.data.ChemicalItems.push({
                                        Name: "Urea",
                                        Quantity: 200,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Soda Kue",
                                        Quantity: 30,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Thickener Reaktif",
                                        Quantity: 700,
                                        Index: idx++
                                    });
    
                                } else {
                                    this.data.ChemicalItems.push({
                                        Name: "Urea",
                                        Quantity: 250,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Soda Kue",
                                        Quantity: 30,
                                        Index: idx++
                                    });
    
                                    this.data.ChemicalItems.push({
                                        Name: "Thickener Reaktif",
                                        Quantity: 650,
                                        Index: idx++
                                    });
    
                                }
                            }

                        //resist
                        }else if(this.subType === "RESIST"){
                            if (0 <= this.sumItem && this.sumItem <= 5) {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 100,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 20,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 800,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Resist",
                                    Quantity: 8,
                                    Index: idx++
                                });
    
                            } else if (5.01 <= this.sumItem && this.sumItem <= 20) {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 100,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 20,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 750,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Resist",
                                    Quantity: 8,
                                    Index: idx++
                                });
    
                            } else if (20.01 <= this.sumItem && this.sumItem <= 40) {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 150,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 30,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 700,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Resist",
                                    Quantity: 8,
                                    Index: idx++
                                });
    
                            } else {
                                this.data.ChemicalItems.push({
                                    Name: "Urea",
                                    Quantity: 150,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Soda Kue",
                                    Quantity: 30,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Thickener Reaktif",
                                    Quantity: 650,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Resist",
                                    Quantity: 8,
                                    Index: idx++
                                });
    
                            }
                        //PIGMENT
                        } else if(this.subType === "PIGMENT"){
                            if (0 <= this.sumItem && this.sumItem <= 30) {
                                this.data.ChemicalItems.push({
                                    Name: "Binder",
                                    Quantity: 100,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Fixer",
                                    Quantity: 10,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Printogen",
                                    Quantity: 15,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Luprimol",
                                    Quantity: 5,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Thickener Pigment",
                                    Quantity: 800,
                                    Index: idx++
                                });
    
                            }else{
                                this.data.ChemicalItems.push({
                                    Name: "Binder",
                                    Quantity: 150,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Fixer",
                                    Quantity: 10,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Printogen",
                                    Quantity: 15,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Luprimol",
                                    Quantity: 5,
                                    Index: idx++
                                });
    
                                this.data.ChemicalItems.push({
                                    Name: "Thickener Pigment",
                                    Quantity: 700,
                                    Index: idx++
                                });

                            }
                        //BROM
                        }else{
                            this.data.ChemicalItems.push({
                                Name: "Binder",
                                Quantity: 750,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Fixing AGent",
                                Quantity: 10,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Oiling",
                                Quantity: 25,
                                Index: idx++
                            });

                        }
                        
                    } else if (this.Type === "PRINTING PIGMENT") {
                        if (0 <= this.sumItem && this.sumItem <= 10) {
                            this.data.ChemicalItems.push({
                                Name: "Binder",
                                Quantity: 80,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Fixing Agent",
                                Quantity: 10,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Oiling",
                                Quantity: 15,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Softener",
                                Quantity: 5,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickner Pigment",
                                Quantity: 800,
                                Index: idx++
                            });

                        } else if (10.01 <= this.sumItem && this.sumItem <= 20) {
                            this.data.ChemicalItems.push({
                                Name: "Binder",
                                Quantity: 100,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Fixing Agent",
                                Quantity: 10,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Oiling",
                                Quantity: 15,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Softener",
                                Quantity: 5,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickner Pigment",
                                Quantity: 800,
                                Index: idx++
                            });

                        } else if (20.01 <= this.sumItem && this.sumItem <= 30) {
                            this.data.ChemicalItems.push({
                                Name: "Binder",
                                Quantity: 150,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Fixing Agent",
                                Quantity: 15,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Oiling",
                                Quantity: 20,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Softener",
                                Quantity: 5,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickner Pigment",
                                Quantity: 700,
                                Index: idx++
                            });

                        } else {
                            this.data.ChemicalItems.push({
                                Name: "Binder",
                                Quantity: 200,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Fixing Agent",
                                Quantity: 15,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Oiling",
                                Quantity: 20,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Softener",
                                Quantity: 5,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Thickner Pigment",
                                Quantity: 700,
                                Index: idx++
                            });

                        }
                    }else if (this.Type === "PRINTING RIPPLE"){
                        this.data.ChemicalItems.push({
                            Name: "Ultrasol RS",
                            Quantity: 270,
                            Index: idx++
                        })

                        this.data.ChemicalItems.push({
                            Name: "TKC New",
                            Quantity: 22.5,
                            Index: idx++
                        })

                        this.data.ChemicalItems.push({
                            Name: "Pararesin UT80",
                            Quantity: 600,
                            Index: idx++
                        })

                        this.data.ChemicalItems.push({
                            Name: "Katalys U",
                            Quantity: 50,
                            Index: idx++
                        })


                    }else {
                        
                            this.data.ChemicalItems.push({
                                Name: "Urea",
                                Quantity: 20,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Soda Kue / Alkali Donor",
                                Quantity: 20,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Anti Reduksi",
                                Quantity: 2,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Anti Migrasi",
                                Quantity: 0.45,
                                Index: idx++
                            });

                            this.data.ChemicalItems.push({
                                Name: "Anti Gas Fade",
                                Quantity: 5,
                                Index: idx++
                            });

                       
                        
                    }
                    var sumQtyItem = this.data.ChemicalItems.reduce((a, b) => +a + +b.Quantity, 0);
                    var waterQty = 1000 - sumQtyItem - this.sumItem;

                    this.data.ChemicalItems.push({
                        Name: "Air",
                        Quantity: waterQty,
                        Index: idx++
                    });

                    this.data.ChemicalItems.push({
                        Name: "Viscositas",
                        Quantity: vNum,
                        Vicositas: true,
                        Index: idx++
                    });
                } else {
                    this.showChemical = false;
                    this.data.ChemicalItems = [];
                }
            } else {
                this.showChemical = false;
                this.data.ChemicalItems = [];
            }
        }

    }

}