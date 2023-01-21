import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
var BookingLoader = require('../../../loader/garment-booking-order-loader');
var moment = require('moment');

@containerless()
@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly = false;
    @bindable isView = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    @bindable selectedBookingOrder;
    @bindable booking = {};
    @bindable preview = {};
    @bindable previewData;
    //@bindable previewDataTable;
    @bindable options = { buyerCode: "" };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }
    
    get filterBookingOrder(){
        var current=new Date();
        var expired=new Date(current.getTime() + (86400000*45)).toLocaleDateString();
        
        var filter= {
            "IsBlockingPlan": false,
            "IsCanceled": false,
            "OrderQuantity>0":true
            
        };
        filter[`DeliveryDate > "${expired}"`]=true;
        return filter;
    } 

    months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    years = [];
    bookingItemColumns = [{ header: "Komoditi" }, { header: "Jumlah" }, { header: "Keterangan" }, { header: "Tanggal Pengiriman" }];

    detailColumns = [
        { header: "Confirm" },
        { header: "Komoditi" },
        { header: "SMV Sewing" },
        { header: "Unit" },
        { header: "Tahun" },
        { header: "Week" },
        { header: "Remaining EH" },
        { header: "Jumlah Order" },
        { header: "Keterangan" },
        { header: "Tanggal Pengiriman" },
        { header: "Efisiensi (%)" },
        { header: "EH Booking" },
        { header: "Sisa EH" },
        { header: "WH Confirm" }
        //{ header: "Plan Working Hours" }
    ];
    previewColumns = [{ header: "Konveksi" }];

    constructor(service, bindingEngine) {
        this.service = service;
        this.bindingEngine = bindingEngine;
        
        var year = (new Date()).getFullYear();
        this.years.push(year);
        for (var a = 1; a < 5; a++) {
            this.years.push(year + a);
        }
        this.previewData = [];
        this.previewData1 = [];
    }

    selectedBookingOrderChanged(newValue) {
        var _selectedData = newValue;
        if (_selectedData) {
            this.data.BookingOrderNo = _selectedData.BookingOrderNo;
            this.data.BookingOrderId = _selectedData.Id;
            this.data.Buyer = {};
            this.data.Buyer.Name = _selectedData.BuyerName;
            this.data.Buyer.Code = _selectedData.BuyerCode;
            this.data.Buyer.Id = _selectedData.BuyerId;
            if (!this.data.Id) {
               
                this.data.BookingOrderDate = _selectedData.BookingOrderDate;
                this.data.DeliveryDate = _selectedData.DeliveryDate;
                this.data.OrderQuantity = _selectedData.OrderQuantity;
                this.data.Remark = _selectedData.Remark;
                this.data.booking = [];
                if(_selectedData.Items){
                    for(var bookItem of _selectedData.Items){
                        if(!bookItem.IsCanceled){
                            this.data.booking.push(bookItem);
                        }
                    }
                }
                this.options.buyerCode = this.data.Buyer.Code;
            }
        } else {
            this.data.BookingOrderDate = null;
            this.data.DeliveryDate = null;
            this.data.OrderQuantity = 0;
            this.data.Remark = "";
            this.data.BookingOrderNo="";
            this.data.BookingOrderId=null;
            this.data.Buyer=null;
            this.data.booking = [];
        }
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.booking = this.context.booking;
        this.options.buyerCode = this.data.Buyer ? this.data.Buyer.Code : "";
        if (this.data.Id) {
            this.bookingCode = `${this.data.BookingOrderNo} - ${this.data.Buyer.Name}`;
            this.options._id = this.data.Id;
            this.remaining=[];
            this.selectedBookingOrder = await this.service.getBookingById(this.data.BookingOrderId);
            
        }
        if (!this.isView) {
            this.previewDataTable1=[];
            this.previewDataTable=[];
            var year = (new Date()).getFullYear();
            var month = (new Date()).getMonth();
            var yr = {
                Year:year
            };
            var yr2 = {
                Year:year+1
            };
            
            this.previewWeeklyPlan = await this.service.getWeeklyPlan(yr);
            this.previewWeeklyPlan2 = await this.service.getWeeklyPlan(yr2);
            
            let prev = [];//for preview year now
            let prev1 = []; //for preview next year
            let weekLength=0; 
            for (var a of this.previewWeeklyPlan) {
                if (a.Year === year) {
                    prev.push(a);
                }
            }
            //assign columns
            this.columnPreview =[];
            if(prev.length>0){
                this.columnPreview = [{ field: "year", title: "Tahun" }, { field: "unitCode", title: "Unit" }];
                for (var i of prev[0].Items) {
                    this.columnPreview.push({ field: i.WeekNumber, title: "W" + i.WeekNumber + " " + moment(i.EndDate).format("DD MMM") });
                }
            }
            for (var a of this.previewWeeklyPlan2) {
                if (a.Year === year + 1) {
                    prev1.push(a);
                }
            }
            this.columnPreview1=[];
            if(prev1.length>0){
                this.columnPreview1= [{ field: "year", title: "Tahun" }, { field: "unitCode", title: "Unit" }];
                for (var i of prev1[0].Items) {
                    this.columnPreview1.push({ field: i.WeekNumber, title: "W" + i.WeekNumber + " " + moment(i.EndDate).format("DD MMM") });
                }
            }
            var options = {
                pagination: false,
                showColumns: false,
                search: false,
                showToggle: false,
                columns: this.columnPreview
            };
            var options1 = {
                pagination: false,
                showColumns: false,
                search: false,
                showToggle: false,
                columns: this.columnPreview1
            };

            this.context.previewTable.__table("refreshOptions", options);
            this.context.previewTable1.__table("refreshOptions", options1);

            //assign data
            var total=[];
            for (var a of prev) {
                let obj = {};
                obj.year = a.Year;
                obj.unitCode = a.Unit.Code;
                for (var b of a.Items) {
                    obj[b.WeekNumber] = b.RemainingEH;
                    if(!total[b.WeekNumber]){
                        total[b.WeekNumber]=b.RemainingEH;
                    }
                    else{
                        total[b.WeekNumber]+=b.RemainingEH;
                    }
                }
                this.previewDataTable.push(obj);
                this.previewData.push(obj);
            }
            var x={
                year:'',
                unitCode:"Total"
            }
            for (var i = 1; i < total.length; i++) {
                x[i]=total[i];
            }

            this.previewDataTable.push(x);
            this.previewData.push(x);
            var total1=[];
            for (var a of prev1) {
                let obj = {};
                obj.year = a.Year;
                obj.unitCode = a.Unit.Code;
                for (var b of a.Items) {
                    obj[b.WeekNumber] = b.RemainingEH;
                    if(!total1[b.WeekNumber]){
                        total1[b.WeekNumber]=b.RemainingEH;
                    }
                    else{
                        total1[b.WeekNumber]+=b.RemainingEH;
                    }
                }
                this.previewDataTable1.push(obj);
                this.previewData1.push(obj);
            }
            var x1={
                year:'',
                unitCode:"Total"
            }
            //sum EH per week
            for (var i = 1; i < total1.length; i++) {
                x1[i]=total1[i];
            }
            this.previewDataTable1.push(x1);
            this.previewData1.push(x1);
        }
            this.items=this.data.Items;
    }



    detailsChanged(e) {
        let group = {};
        //this.previewDataTable =this.previewData;
        //this.previewDataTable = JSON.parse(JSON.stringify(this.previewData));
        //console.log(this.options);
        
        if (this.data.Items) {
            var remEH=[];
            for (let detail of this.data.Items) {
                if(detail.Year && detail.Unit.Code && detail.WeekNumber){
                    let cat=detail.Year.toString() + detail.Unit.Code.toString()+detail.WeekNumber.toString();
                    let uniq = this.data.Items.find(o => {
                        if(o.Year && o.Unit.Code && o.WeekNumber){
                            if( o.Year.toString() + o.Unit.Code.toString() + o.WeekNumber.toString()  == cat)
                            return o;
                        }
                    });
                    let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.Year.toString() + detail.Unit.Code.toString()));
                    if(item){
                        remEH[cat]=item[detail.WeekNumber];
                    }
                    if(this.tempEH){
                        if(remEH[cat]){
                            if(remEH[cat]<this.tempEH[cat]){
                                remEH[cat]=this.tempEH[cat];
                            }
                        }
                    }
                    else{
                        let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.Year.toString() + detail.Unit.Code.toString()));
                        if(item1){
                            remEH[cat]=item1[detail.WeekNumber];
                        }
                    }
                    if(remEH[cat]){
                        if(remEH[cat]<uniq.RemainingEH){
                            remEH[cat]=uniq.RemainingEH;
                        }
                    }
                    else{
                        remEH[cat]=uniq.RemainingEH;
                    }
                }
                
                if(detail.oldVal){
                    if(detail.oldVal.year && detail.oldVal.unitCode && detail.oldVal.weekNumber){
                        let cat=detail.oldVal.year.toString() + detail.oldVal.unitCode.toString()+ detail.oldVal.weekNumber.toString();
                        if(remEH[cat]){
                            if(remEH[cat]<detail.oldVal.remainingEH){
                                remEH[cat]=detail.oldVal.remainingEH;
                            }
                        }
                        else{
                            remEH[cat]=detail.oldVal.remainingEH;
                        }
                    }
                }
                if(detail.oldVal){
                    if(detail.oldVal.year && detail.oldVal.unitCode){
                        let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.oldVal.year.toString() + detail.oldVal.unitCode.toString()));
                        if (item) {
                            item[detail.oldVal.weekNumber] = detail.oldVal.remainingEH;
                            var total=[];
                            for( var a =0; a<this.previewData.length-1; a++){
                                if(!total[detail.oldVal.weekNumber]){
                                    total[detail.oldVal.weekNumber]=this.previewData[a][detail.oldVal.weekNumber];
                                }
                                else{
                                    total[detail.oldVal.weekNumber]+=this.previewData[a][detail.oldVal.weekNumber];
                                }
                            }
                            let totalItem=this.previewData.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                            totalItem[detail.oldVal.weekNumber]=total[detail.oldVal.weekNumber];
                        }
                        else{
                            let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == (detail.oldVal.year.toString() + detail.oldVal.unitCode.toString()));
                            if (item1) {
                                item1[detail.oldVal.weekNumber] = detail.oldVal.remainingEH;
                                var total1=[];
                                for( var a =0; a<this.previewData1.length-1; a++){
                                    if(!total1[detail.oldVal.weekNumber]){
                                        total1[detail.oldVal.weekNumber]=this.previewData1[a][detail.oldVal.weekNumber];
                                    }
                                    else{
                                        total1[detail.oldVal.weekNumber]+=this.previewData1[a][detail.oldVal.weekNumber];
                                    }
                                }
                                let totalItem1=this.previewData1.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                                totalItem1[detail.oldVal.weekNumber]=total1[detail.oldVal.weekNumber];
                            }
                        }
                    }
                    detail.oldVal={};
                }
            }
            for (let detail of this.data.Items) {
                if(detail.Year && detail.Unit.Code && detail.WeekNumber){
                    let category = detail.Year.toString() + detail.Unit.Code.toString();
                    let cat=detail.Year.toString() + detail.Unit.Code.toString()+detail.WeekNumber.toString();
                    //let cat=detail.weeklyPlanYear.toString() + detail.unit.code.toString()+detail.WeekNumber.toString();
                    // //console.log(category );
                     detail.RemainingEH= remEH[cat];
                     detail.sisaEH=detail.RemainingEH-detail.EHBooking;
                     remEH[cat]-=detail.EHBooking;
                    let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                    //console.log(category);
                    if (item) {
                        item[detail.WeekNumber] = detail.sisaEH;
                        var total=[];
                        for( var a =0; a<this.previewData.length-1; a++){
                            if(!total[detail.WeekNumber]){
                                total[detail.WeekNumber]=this.previewData[a][detail.WeekNumber];
                            }
                            else{
                                total[detail.WeekNumber]+=this.previewData[a][detail.WeekNumber];
                            }
                        }
                        let totalItem=this.previewData.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                        totalItem[detail.WeekNumber]=total[detail.WeekNumber];
                    }
                    else{
                        let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                        if (item1) {
                            item1[detail.WeekNumber] = detail.sisaEH;
                            var total1=[];
                            for( var a =0; a<this.previewData1.length-1; a++){
                                if(!total1[detail.WeekNumber]){
                                    total1[detail.WeekNumber]=this.previewData1[a][detail.WeekNumber];
                                }
                                else{
                                    total1[detail.WeekNumber]+=this.previewData1[a][detail.WeekNumber];
                                }
                            }
                            let totalItem1=this.previewData1.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                            totalItem1[detail.WeekNumber]=total1[detail.WeekNumber];
                        }
                    }
                }
            }
            this.tempEH=[];
            for(let eh of this.data.Items){
                if(eh.Year && eh.Unit.Code && eh.WeekNumber){
                    let cat=eh.Year.toString() + eh.Unit.Code.toString()+eh.WeekNumber.toString();
                    if(!this.tempEH[cat]){
                        this.tempEH[cat]=eh.RemainingEH;
                    }
                }
            }
        }

        this.context.previewTable.refresh();
        this.context.previewTable1.refresh();

        //this.previewDataTable;
    }

    get removeDetails() {
        return (event) => //console.log(event.detail);
        {
            this.previewDataTable = []

            if (event.detail) {
                for (let detail of this.data.Items) {
                    if(event.detail.Year && event.detail.unit && event.detail.week){
                        let remCat=event.detail.Year.toString() + event.detail.Unit.Code.toString() + event.detail.WeekNumber.toString();
                        let category = event.detail.Year.toString() + event.detail.Unit.Code.toString();
                        let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                        if (item) {
                            item[event.detail.WeekNumber] = event.detail.RemainingEH;
                            var total=[];
                            for( var a =0; a<this.previewData.length-1; a++){
                                if(!total[event.detail.WeekNumber]){
                                    total[event.detail.WeekNumber]=this.previewData[a][event.detail.WeekNumber];
                                }
                                else{
                                    total[event.detail.WeekNumber]+=this.previewData[a][event.detail.WeekNumber];
                                }
                            }
                            let totalItem=this.previewData.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                            totalItem[event.detail.WeekNumber]=total[event.detail.WeekNumber];
                        }
                        else{
                            let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                            if (item1) {
                                item1[event.detail.WeekNumber] = event.detail.RemainingEH;
                                var total1=[];
                                for( var a =0; a<this.previewData1.length-1; a++){
                                    if(!total1[event.detail.WeekNumber]){
                                        total1[event.detail.WeekNumber]=this.previewData1[a][event.detail.WeekNumber];
                                    }
                                    else{
                                        total1[event.detail.WeekNumber]+=this.previewData1[a][event.detail.WeekNumber];
                                    }
                                }
                                let totalItem1=this.previewData1.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                                totalItem1[event.detail.WeekNumber]=total1[event.detail.WeekNumber];
                            }
                        }
                    }
                }
                    var remEH=[];
                    for (let detail of this.data.Items) {
                        if(detail.Year && detail.unit && detail.week && event.detail.Year && event.detail.Unit.Code && event.detail.WeekNumber){
                            let remCat=event.detail.Year.toString() + event.detail.Unit.Code.toString() + event.detail.WeekNumber.toString();
                            let cat=detail.Year.toString() + detail.Unit.Code.toString()+detail.WeekNumber.toString();
                            let uniq = this.data.Items.find(o => (o.Year.toString() + o.Unit.Code.toString() + o.WeekNumber.toString())  == cat);
                            if(cat===remCat){
                                if(uniq.RemainingEH<event.detail.RemainingEH){
                                    remEH[cat]=event.detail.RemainingEH;
                                }
                                else{
                                    remEH[cat]=uniq.RemainingEH;
                                }
                            }
                            else{
                                remEH[cat]=uniq.RemainingEH;
                            }
                        }
                    }
                    for (let detail of this.data.Items) {
                        if(detail.Year && detail.unit && detail.week && event.detail.Year && event.detail.Unit.Code && event.detail.WeekNumber){
                            let cat=detail.Year.toString() + detail.Unit.Code.toString()+detail.WeekNumber.toString();
                            let remCat=event.detail.Year.toString() + event.detail.Unit.Code.toString() + event.detail.WeekNumber.toString();
                            //let cat=detail.weeklyPlanYear.toString() + detail.unit.code.toString()+detail.WeekNumber.toString();
                            // //console.log(category );
                            // detail.RemainingEH= remEH[cat];
                            // remEH[cat]-=detail.week.usedEH;
                            if(cat==remCat){
                                detail.RemainingEH=remEH[cat];
                                detail.sisaEH=detail.RemainingEH-detail.EHBooking;
                                remEH[cat]-=detail.EHBooking;
                                //console.log(remEH[cat]);
                            }
                            
                        }
                    }
                if(!this.data.detail){
                    if(event.detail.Year && event.detail.Unit.Code && event.detail.WeekNumber){
                        let category = event.detail.Year.toString() + event.detail.Unit.Code.toString();
                        let item = this.previewData.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                        if (item) {
                            item[event.detail.WeekNumber] = event.detail.RemainingEH;
                            var total=[];
                            for( var a =0; a<this.previewData.length-1; a++){
                                if(!total[event.detail.WeekNumber]){
                                    total[event.detail.WeekNumber]=this.previewData[a][event.detail.WeekNumber];
                                }
                                else{
                                    total[event.detail.WeekNumber]+=this.previewData[a][event.detail.WeekNumber];
                                }
                            }
                            let totalItem=this.previewData.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                            totalItem[event.detail.WeekNumber]=total[event.detail.WeekNumber];
                        }
                        else{
                            let item1 = this.previewData1.find(o => (o.year.toString() + o.unitCode.toString()) == category);
                            if (item1) {
                                item1[event.detail.WeekNumber] = event.detail.RemainingEH;
                                var total1=[];
                                for( var a =0; a<this.previewData1.length-1; a++){
                                    if(!total1[event.detail.WeekNumber]){
                                        total1[event.detail.WeekNumber]=this.previewData1[a][event.detail.WeekNumber];
                                    }
                                    else{
                                        total1[event.detail.WeekNumber]+=this.previewData1[a][event.detail.WeekNumber];
                                    }
                                }
                                let totalItem1=this.previewData1.find(o => (o.year.toString() ==''&& o.unitCode.toString()) == "Total");
                                totalItem1[event.detail.WeekNumber]=total1[event.detail.WeekNumber];
                            }
                        }
                    }
                }
            }

            this.context.previewTable.refresh();
            this.context.previewTable1.refresh();
        };

    }

    

    get bookingLoader() {
        return BookingLoader;
    }

    bookingView = (booking) => {
        return `${booking.BookingOrderNo} - ${booking.BuyerName}`
    }

    get addDetails() {
        return (event) => {
            var newDetail = {
                IsConfirmed: false,
                SMVSewing: 0,
                OrderQuantity: 0,
                Comodity:null,
                Unit:null,
                WeeklyPlanId:0,
                Remark: ""
            };
            this.data.Items.push(newDetail);
        };
    }
    
}