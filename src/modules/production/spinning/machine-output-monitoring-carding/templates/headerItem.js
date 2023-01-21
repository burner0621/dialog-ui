export class ItemHeader {

    activate(context) {
      this.context = context;
      this.data = context.items;
      this.error = context.error;
      console.log(this.data)
      console.log(this.context)
      this.options = this.context.options;
    }
  
    controlOptions = {
      control: {
        length: 12
      }
    };
  }