import numeral from 'numeral';
export class COAItem {

    activate(context) {
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        
    }
    
    controlOptions = {
        control: {
            length: 12
        }
    };
}