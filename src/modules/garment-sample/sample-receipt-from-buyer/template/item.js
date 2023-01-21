import { bindable, inject,computedFrom } from 'aurelia-framework'
import { Service,PackingService } from "../service";

const InvoiceLoader = require('../../../../loader/garment-sample-packing-list-loader');

const InvoiceItemLoader = require('../../../../loader/garment-sample-packing-list-item-loader');
const InvoiceDetailLoader = require('../../../../loader/garment-sample-packing-list-detail-loader');
@inject(PackingService)
export class Item {
  @bindable selectedInvoice;
  @bindable selectedRo;
  @bindable selectedStyle;
  @bindable  selectedSize;
  @bindable  style=[];
  @bindable  sizes=[];
  @bindable  tempStyle=[];
  @bindable  tempSize=[];
 
 
  constructor(packingService) {
    this.packingService = packingService;
}

  @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }
  get invoiceLoader() {
      return InvoiceLoader;
  }
invoiceView =(invoice) => {
    return `${invoice.invoiceNo}`;
}
roView =(ro) => { 
  return `${ro.roNo}`;
} 
 
get roLoader() {
  return InvoiceItemLoader;
}
get styleLoader() {
  return InvoiceDetailLoader;
}
get roFilter() {
  
  if (this.selectedInvoice ) {
      return {
          InvoiceNo: this.selectedInvoice.InvoiceNo 
      };
     }
  }

  selectedInvoiceChanged(newValue) {
  //  this.data.buyer ="";
  //  this.data.BuyerAgentId =0;
  //  this.data.BuyerAgentCode ="";
  //  this.data.BuyerAgentName ="";
  //  this.selectedRo= null;
   //this.selectedStyle= null;
      if (newValue) {
        this.data.buyer= newValue.buyerAgent.code + "-" + newValue.buyerAgent.name;
        this.data.BuyerAgentId= newValue.buyerAgent.id;
        this.data.BuyerAgentCode= newValue.buyerAgent.code;
        this.data.BuyerAgentName= newValue.buyerAgent.name;
        this.data.InvoiceNo=newValue.invoiceNo;
   
      }
    }
    selectedStyleChanged(newValue) {
      this.data.Colour ="";
      this.data.SizeId=0;
      this.data.SizeName = "";
      console.log(this.tempStyle);
      if(newValue)
        {
           var iStyle= this.tempStyle.find(s=>s.style == newValue);
           this.data.Style = newValue;
              if(iStyle)
              {
                  this.data.Colour = iStyle.colour;
              }
        }
     }
        selectedSizeChanged(newValue)
        {
          if(newValue)
          { 
             var iSize= this.tempSize.find(s=>s.size == newValue);
             console.log(iSize);
           if(iSize)
           {

           this.data.SizeId = iSize.id;
           
           this.data.SizeName = iSize.size;
           }
          }
        }

    async    activate(context) {
          this.context = context;
          this.data = context.data;
          this.error = context.error;
          this.options = context.options;
          this.readOnly = this.options.readOnly;
          this.isCreate = context.context.options.isCreate;
       
          this.header = context.context.options.header;
          this.itemOptions = {
              error: this.error,
              isCreate: this.isCreate,
              readOnly: this.readOnly,
              isEdit: this.isEdit,
              header: this.header,
              item: this.data
          };
          this.header = context.context.options.header;
          console.log(this.tempSize);
          if(this.data)
          {
            this.selectedInvoice= this.data.InvoiceNo;
            if(this.selectedInvoice)
            {
            this.data.buyer = this.data.BuyerAgentCode + "-" +  this.data.BuyerAgentName;
            }
            if(this.data.RONo )
            {
              await this.packingService.getStyle(this.data.RONo)
              .then(result => {
                console.log(result);
           for(var item of result)
           {
            this.style.push(item.style);
            this.tempStyle.push(item);
          
            for(var size of item.sizes)
            {
                this.sizes.push(size.size.size);
                this.tempSize.push(size.size);
            }
          }
             });
            }
            this.selectedRo= this.data.RONo;
            this.selectedSize=this.data.SizeName;
            this.selectedStyle = this.data.Style;
          }
         
        }
  
    async selectedRoChanged(newValue) {
      // this.data.RONo= "";
      // this.data.Article= "";
      // this.data.Description= "";
     
      if (newValue) {
    
          this.data.RONo= newValue.roNo;
          this.data.Article= newValue.article;
          this.data.Description= newValue.description;
          this.data.ComodityId= newValue.comodityId;
          this.data.ComodityCode= newValue.comodityCode;
          this.data.ComodityName = newValue.comodityName;
       
         await this.packingService.getStyle(this.data.RONo)
          .then(result => {
            console.log(result);
       for(var item of result)
       {
        this.style.push(item.style);
        this.tempStyle.push(item);
      
        for(var size of item.sizes)
        {
            this.sizes.push(size.size.size);
            this.tempSize.push(size.size);
        }
      }
         });
      
               }
              }
            }