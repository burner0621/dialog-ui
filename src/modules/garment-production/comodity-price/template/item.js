import { inject, bindable, containerless, BindingEngine, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from "../service";

@containerless()
@inject(BindingEngine, Service, CoreService)
export class Item {
    @bindable selectedComodity;
    constructor(bindingEngine, service,coreService) {
        this.bindingEngine = bindingEngine;
        this.service = service;
        this.coreService=coreService;
      }
    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = this.context.error;		
        this.options = this.context.options;  
        this.selectedComodity=this.data.Comodity;  
        console.log(this.data)
    }

    selectedComodityChanged(newValue){
        this.data.Comodity=newValue;
    }


    @computedFrom("data.Id")
        get isEdit() {
            return (this.data.Id || '').toString() != '';
        }

        comodityView = (comodity) => {
            return `${comodity.Code}-${comodity.Name}`;
        }

        get comodityLoader() {
            return (keyword) => {
                var info = {
                  keyword: keyword
                };
                return this.coreService.getGarmentComodity(info)
                    .then((result) => {
                        return this.service.search({ filter: JSON.stringify({ UnitId: this.data.Unit.Id, IsValid:true }) })
                            .then((price) => {
                                var comoList=[];
                                for(var a of result.data){
                                    if(price.data.length>0){
                                        var dup= price.data.find(c=>c.Comodity.Id==a.Id);
                                        if(dup)
                                            continue;
                                        else
                                        comoList.push(a);
                                    }
                                    else{
                                        comoList.push(a);
                                    }
                                }
                                return comoList;
                            })
                        
                    });
            }
        }
}