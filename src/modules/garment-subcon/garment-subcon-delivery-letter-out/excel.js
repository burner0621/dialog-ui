import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

@inject(Router, Service)
export class Create {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    
    @bindable selectedContractType;    
    @bindable selectedSubconCategory;
    
    info = { page: 1,size:25};

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    contractTypes = ["SUBCON GARMENT", "SUBCON BAHAN BAKU", "SUBCON JASA"];
    SubconCategoryTypeOptions=["SUBCON CUTTING SEWING","SUBCON SEWING"];

    activate() {
       
    }
   
    BackToList() {
        this.router.navigateToRoute('list');        
    }

    ExportToExcel() {
        {
        var info = {            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            };
        console.log(this.selectedContractType);
        if (this.selectedContractType === "SUBCON GARMENT") 
           {
               if (this.selectedSubconCategory === "SUBCON CUTTING SEWING")
                {
                       this.service.generateExcel1(info)
                       .catch(e => {
                       alert(e.replace(e, "Error: ",""))
                       });
                }       
                else
                {
                       this.service.generateExcel2(info)
                       .catch(e => {
                       alert(e.replace(e, "Error: ",""))
                       });
                }
                console.log(this.selectedSubconCategory);
            } 
            else if (this.selectedContractType === "SUBCON JASA") 
            {
                if (this.selectedSubconCategory === "SUBCON JASA KOMPONEN")
                {
                       this.service.generateExcel4(info)
                       .catch(e => {
                       alert(e.replace(e, "Error: ",""))
                       });
                }       
                else
                {
                       this.service.generateExcel5(info)
                       .catch(e => {
                       alert(e.replace(e, "Error: ",""))
                       });
                }
                console.log(this.selectedSubconCategory);
            } 
            else if (this.selectedContractType === "SUBCON BAHAN BAKU") 
                {
                    this.service.generateExcel3(info)
                    .catch(e => {
                    alert(e.replace(e, "Error: ",""))
                    });
                 }
        }
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }
    }


    selectedContractTypeChanged(newvalue) {
        if (newvalue) {
            if (newvalue === "SUBCON GARMENT") {
                 this.SubconCategoryTypeOptions=["SUBCON CUTTING SEWING","SUBCON SEWING"];
            }
            else if (newvalue === "SUBCON BAHAN BAKU") { 
                this.SubconCategoryTypeOptions=["SUBCON BB SHRINKAGE/PANEL","SUBCON BB FABRIC WASH/PRINT"];
            }
            else {
                this.SubconCategoryTypeOptions=["SUBCON JASA GARMENT WASH","SUBCON JASA KOMPONEN"];
            }
        }
   }
}
    

