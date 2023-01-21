export class DeliveryOrderItemHeader {

    activate(context) {
      this.context = context;
      this.saveAll=false;
      this.data = context.items;
      this.error = context.error;
      this.options = this.context.options;
      var count = 0;
      
      for(var item of this.context.items){
        if(item.data.selected==true){
          count++;
        }
      }
      if(count>0){
        this.saveAll=true;
      }
    }
  
    saveAllChanged(e) {
      for(var a of this.context.items){
        if(this.saveAll)
          a.data.selected=true;
        else
          a.data.selected=false;
      }
    }
  
    controlOptions = {
      control: {
        length: 12
      }
    };
  }