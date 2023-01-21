import numeral from 'numeral';

export class DetailFooter {
    controlOptions = {
        label: {
            length: 12,
            align: "right"
        },
        control: {
            length: 0
        }
    }


    activate(context) {
        this.context = context;
        console.log(this.context)
    }

    get totalQuantity() {
        var qty = this.context.items
          .map((item) => item.data.qty);
        return qty
          .reduce((prev, curr, index) => { return prev + curr }, 0);
      }
    

}