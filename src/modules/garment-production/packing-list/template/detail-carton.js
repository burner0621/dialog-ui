import { inject, bindable, computedFrom } from 'aurelia-framework'


export class Detail {
    @bindable selectedRO;
    @bindable length;
    @bindable width;
    @bindable height;

    constructor() {
        
    }
    sizesColumns = [
        { header: "Size" },
        { header: "Quantity" },
    ];
    

    toggle() {
        if (!this.isShowing)
          this.isShowing = true;
        else
          this.isShowing = !this.isShowing;
      }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };

        this.isShowing = true;
        
        if(this.data.sizes){
            if(this.data.sizes.length>0){
                this.isShowing = true;
            }
        }

        this.length = this.data.length;
        this.width = this.data.width;
        this.height = this.data.height;
    }


    get addSizes() {
        return (event) => {
            this.data.sizes.push({});
        };
    }

    get removeSizes() {
        return (event) => {
            this.error = null;
     };
    }

    get totalQuantity(){
        if(this.data.cartonQuantity && this.data.quantityPCS){
            this.data.totalQuantity=this.data.cartonQuantity*this.data.quantityPCS;
            return this.data.totalQuantity;
        }
        else
            return 0;
    }

    @computedFrom('data.carton1', 'data.carton2')
    get cartonQuantity(){
        this.data.cartonQuantity=0;
        if(this.data.carton1 && this.data.carton2){
            this.data.cartonQuantity = this.data.carton2-this.data.carton1+1;
        }
        this.updateMeasurements();
        return this.data.cartonQuantity;
    }

    get totalQtySize(){
        var qtytot=0;
        if(this.data.sizes){
            for(var size of this.data.sizes){
                if(size.quantity){
                    qtytot+=size.quantity;
                }
            }
        }
        return qtytot;
    }

    get cmb() {
        if (this.data.length && this.data.width && this.data.height && this.data.cartonQuantity)
            return (this.data.length * this.data.width * this.data.height * this.data.cartonQuantity / 1000000).toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        else
            return "0";
    }

    lengthChanged(newValue) {
        this.data.length = newValue;
        this.updateMeasurements();
    }

    widthChanged(newValue) {
        this.data.width = newValue;
        this.updateMeasurements();
    }

    heightChanged(newValue) {
        this.data.height = newValue;
        this.updateMeasurements();
    }

    updateMeasurements() {
        let measurements = [];

        for (const item of this.context.context.options.header.items) {
            for (const detail of item.details) {
                let measurement = measurements.find(m => m.length == detail.length && m.width == detail.width && m.height == detail.height);
                if (measurement) {
                    measurement.cartonsQuantity += detail.cartonQuantity;
                } else {
                    measurements.push({
                        length: detail.length,
                        width: detail.width,
                        height: detail.height,
                        cartonsQuantity: detail.cartonQuantity
                    });
                }
            }
        }

        this.context.context.options.header.measurements = this.context.context.options.header.measurements || [];
        this.context.context.options.header.measurements.splice(0);

        for (const mt of measurements) {
            let measurement = (this.context.context.options.header.measurementsTemp || []).find(m => m.length == mt.length && m.width == mt.width && m.height == mt.height);
            if (measurement) {
                measurement.cartonsQuantity = mt.cartonsQuantity;
                this.context.context.options.header.measurements.push(measurement);
            } else {
                this.context.context.options.header.measurements.push(mt);
            }
        }

        this.context.context.options.header.measurements.forEach((m, i) => m.MeasurementIndex = i);
    }
}