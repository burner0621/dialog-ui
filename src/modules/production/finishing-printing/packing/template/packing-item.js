import numeral from 'numeral';
export class PackingItem {

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if (!this.data.Weight) {
            this.data.Weight = 0;
        }
        if (!this.data.Quantity) {
            this.data.Quantity = 0;
        }
        if (!this.data.Length) {
            this.data.Length = 0;
        }
    }
    
    get WeightTotal() {
        return this.data.WeightTotalAmount ? numeral(this.data.WeightTotalAmount).format('0,000.0000') : numeral(this.data.Weight * this.data.Quantity).format('0,000.0000');
    }

    get LengthTotal() {
        return this.data.LengthTotalAmount ? numeral(this.data.LengthTotalAmount).format('0,000.0000') : numeral(this.data.Length * this.data.Quantity).format('0,000.0000');
    }

    get Quantity() {
        return numeral(this.data.Quantity).format('0,000');
    }

    get Weight() {
        return numeral(this.data.Weight).format('0,000.0000');
    }

    get Length() {
        return numeral(this.data.Length).format('0,000.0000');
    }

    // grades = ["", "A", "B", "C", "AA", "BB", "CC", "BS", "AVAL"];
    Grades = ["", "A", "B", "C", "BS FINISH", "BS MATERIAL", "AVAL"];

    controlOptions = {
        control: {
            length: 12
        }
    };
}