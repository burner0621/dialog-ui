import {inject, bindable} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    @bindable UnitItem;

    UnitItems = ['','KONFEKSI 2A','KONFEKSI 2B','KONFEKSI 2C','KONFEKSI 1A','KONFEKSI 1B']
    
    searching() {
        var info = {
            unit : this.unit ? this.unit : 0,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            ro : this.ro ?this.ro:""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];
                for(var _data of result){
                    _data.QtyOrder = _data.QtyOrder.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.FC = _data.FC.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._MaterialUsage = (_data.FinishingInExpenditure * _data.BasicPrice ).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceUsage = (_data.FinishingInExpenditure * _data.Fare ).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BasicPrice = _data.BasicPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceCuttingQty = _data.BeginingBalanceCuttingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceCuttingPrice = _data.BeginingBalanceCuttingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtyCuttingIn = _data.QtyCuttingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceCuttingIn = _data.PriceCuttingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtyCuttingOut = _data.QtyCuttingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceCuttingOut = _data.PriceCuttingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtyCuttingTransfer = _data.QtyCuttingTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceCuttingTransfer = _data.PriceCuttingTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtyCuttingsubkon = _data.QtyCuttingsubkon.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceCuttingsubkon = _data.PriceCuttingsubkon.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._AvalCutting = _data.AvalCutting.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._AvalCuttingPrice = _data.AvalCuttingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._AvalSewing = _data.AvalSewing.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._AvalSewingPrice = _data.AvalSewingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalancCuttingeQty = _data.EndBalancCuttingeQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalancCuttingePrice = _data.EndBalancCuttingePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceLoadingQty = _data.BeginingBalanceLoadingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceLoadingPrice = _data.BeginingBalanceLoadingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtyLoading = _data.QtyLoading.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceLoading = _data.PriceLoading.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtyLoadingIn = _data.QtyLoadingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceLoadingIn = _data.PriceLoadingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtyLoadingInTransfer = _data.QtyLoadingInTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceLoadingInTransfer = _data.PriceLoadingInTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtyLoadingAdjs = _data.QtyLoadingAdjs.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceLoadingAdjs = _data.PriceLoadingAdjs.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalanceLoadingQty = _data.EndBalanceLoadingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalanceLoadingPrice = _data.EndBalanceLoadingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceSewingQty = _data.BeginingBalanceSewingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceSewingPrice = _data.BeginingBalanceSewingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtySewingIn = _data.QtySewingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceSewingIn = _data.PriceSewingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtySewingOut = _data.QtySewingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceSewingOut = _data.PriceSewingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtySewingAdj = _data.QtySewingAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceSewingAdj = _data.PriceSewingAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtySewingInTransfer = _data.QtySewingInTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceSewingInTransfer = _data.PriceSewingInTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });           			
                    _data._WipSewingOut = _data.WipSewingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._WipSewingOutPrice = _data.WipSewingOutPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._WipFinishingOut = _data.WipFinishingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._WipFinishingOutPrice = _data.WipFinishingOutPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtySewingRetur = _data.QtySewingRetur.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceSewingRetur = _data.PriceSewingRetur.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._QtySewingAdj = _data.QtySewingAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._PriceSewingAdj = _data.PriceSewingAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalanceSewingQty = _data.EndBalanceSewingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalanceSewingPrice = _data.EndBalanceSewingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceFinishingQty = _data.BeginingBalanceFinishingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceFinishingPrice = _data.BeginingBalanceFinishingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingInQty = _data.FinishingInQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingInPrice = _data.FinishingInPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingAdjQty = _data.FinishingAdjQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingAdjPRice = _data.FinishingAdjPRice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingInTransferQty = _data.FinishingInTransferQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingInTransferPrice = _data.FinishingInTransferPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingOutQty = _data.FinishingOutQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingOutPrice = _data.FinishingOutPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingReturQty = _data.FinishingReturQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingReturPrice = _data.FinishingReturPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalanceSubconQty = _data.EndBalanceSubconQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalanceSubconPrice = _data.EndBalanceSubconPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalanceFinishingQty = _data.EndBalanceFinishingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalanceFinishingPrice = _data.EndBalanceFinishingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceSubconQty = _data.BeginingBalanceSubconQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceSubconPrice = _data.BeginingBalanceSubconPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._SubconInQty = _data.SubconInQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._SubconInPrice = _data.SubconInPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._SubconOutQty = _data.SubconOutQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._SubconOutPrice = _data.SubconOutPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceExpenditureGood = _data.BeginingBalanceExpenditureGood.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._BeginingBalanceExpenditureGoodPrice = _data.BeginingBalanceExpenditureGoodPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._ExpenditureGoodRetur = _data.ExpenditureGoodRetur.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._ExpenditureGoodReturPrice = _data.ExpenditureGoodReturPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._SampleQty = _data.SampleQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._SamplePrice = _data.SamplePrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._ExportQty = _data.ExportQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._ExportPrice = _data.ExportPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._OtherQty = _data.OtherQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._OtherPrice = _data.OtherPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._ExpenditureGoodAdj = _data.ExpenditureGoodAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._ExpenditureGoodAdjPrice = _data.ExpenditureGoodAdjPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalanceExpenditureGood = _data.EndBalanceExpenditureGood.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._EndBalanceExpenditureGoodPrice = _data.EndBalanceExpenditureGoodPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingInExpenditure = _data.FinishingInExpenditure.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    //_data._FinishingInExpenditurepPrice = _data.FinishingInExpenditurepPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    //minta diganti priceusage+material usage
                    _data._FinishingInExpenditurepPrice = ((_data.FinishingInExpenditure * _data.BasicPrice )+(_data.FinishingInExpenditure * _data.Fare) ).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                   
                    _data._FareNew = _data.FareNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._LoadingNew = _data.LoadingNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._CuttingNew = _data.CuttingNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._SewingNew = _data.SewingNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._FinishingNew = _data.FinishingNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._SubconNew = _data.SubconNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._ExpenditureNew = _data.ExpenditureNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
                    _data._ExpenditureGoodInTransfer = _data.ExpenditureGoodInTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
                    _data._ExpenditureGoodInTransferPrice = _data.ExpenditureGoodInTransferPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
                   
                    
                    this.data.push(_data);
                    console.log(this.data);
                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit : 0,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            ro : this.ro ?this.ro:"",
            type :"bookkeeping"
        }
        this.service.generateExcel(info);
    }

    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    
    }

    
    get BeginingBalanceCuttingQtyTotal()
    {
        var beginingBalanceCuttingQtyTotal=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            beginingBalanceCuttingQtyTotal += item.BeginingBalanceCuttingQty;
        }
        }
        return beginingBalanceCuttingQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get BeginingBalanceCuttingPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceCuttingPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get QtyCuttingInTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtyCuttingIn;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get PriceCuttingInTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceCuttingIn;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get QtyCuttingOutTotal()
    {
        var qtyCuttingOutTotal=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            qtyCuttingOutTotal += item.QtyCuttingOut;
        }
        }
        return qtyCuttingOutTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get PriceCuttingOutTotal()
    {
        var qtyCuttingOutTotal=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            qtyCuttingOutTotal += item.PriceCuttingOut;
        }
        }
        return qtyCuttingOutTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get QtyCuttingTransferTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtyCuttingTransfer;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get PriceCuttingTransferTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceCuttingTransfer;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get QtyCuttingsubkonTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtyCuttingsubkon;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get PriceCuttingsubkonTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceCuttingsubkon;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get AvalCuttingTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.AvalCutting;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get PriceAvalCuttingTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.AvalCuttingPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get AvalSewingTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.AvalSewing;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get PriceAvalSewingTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.AvalSewingPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get EndBalancCuttingeQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalancCuttingeQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get EndBalancCuttingePriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalancCuttingePrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get BeginingBalanceLoadingQtyotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceLoadingQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get BeginingBalanceLoadingPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceLoadingPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get QtyLoadingInTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtyLoadingIn;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    
    get PriceLoadingInTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceLoadingIn;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get QtyLoadingInTotalTransfer()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtyLoadingInTransfer;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    
    get PriceLoadingInTotalTransfer()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceLoadingInTransfer;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get QtyLoadingTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtyLoading;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get PriceLoadingTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceLoading;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get QtyLoadingAdjsTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtyLoadingAdjs;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get PriceLoadingAdjsTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceLoadingAdjs;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get EndBalanceLoadingQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalanceLoadingQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get EndBalanceLoadingPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalanceLoadingPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    
    get BeginingBalanceSewingQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceSewingQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get BeginingBalanceSewingPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceSewingPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get QtySewingInTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtySewingIn;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get PriceSewingInTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceSewingIn;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    get QtySewingOutTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtySewingOut;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get PriceSewingOutTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceSewingOut;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get QtySewingInTransferTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtySewingInTransfer;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get PriceSewingInTransferTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceSewingInTransfer;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get QtySewingInTransferTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtySewingInTransfer;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get PriceSewingInTransferTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceSewingInTransfer;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get WipSewingOutTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.WipSewingOut;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }     
    get PriceWipSewingOutTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.WipSewingOutPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }   
    get WipFinishingOutTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.WipFinishingOut;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get PriceWipFinishingOutTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.WipFinishingOutPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }        
    get QtySewingReturTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtySewingRetur;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }   
    get PriceSewingReturTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceSewingRetur;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }     
    get QtySewingAdjTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.QtySewingAdj;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get PriceSewingAdjTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.PriceSewingAdj;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get EndBalanceSewingQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalanceSewingQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get EndBalanceSewingPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalanceSewingPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }       
    get BeginingBalanceFinishingQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceFinishingQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get BeginingBalanceFinishingPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceFinishingPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }   
    get FinishingInQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingInQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingInPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingInPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get BeginingBalanceSubconQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceSubconQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get BeginingBalanceSubconPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceSubconPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }   
    get SubconInQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.SubconInQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get SubconInPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.SubconInPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }   
    get SubconOutQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.SubconOutQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get SubconOutPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.SubconOutPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get EndBalanceSubconQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalanceSubconQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get EndBalanceSubconPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalanceSubconPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingOutQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingOutQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingOutPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingOutPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingInTransferQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingInTransferQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingInTransferPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingInTransferPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingAdjQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingAdjQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingAdjPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingAdjPRice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingReturQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingReturQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingReturPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingReturPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get EndBalanceFinishingQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalanceFinishingQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get EndBalanceFinishingPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalanceFinishingPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get BeginingBalanceExpenditureGoodTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceExpenditureGood;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get PriceBeginingBalanceExpenditureGoodTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.BeginingBalanceExpenditureGoodPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingInExpenditureTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingInExpenditure;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get PriceFinishingInExpenditureTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingInExpenditurepPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get ExpenditureGoodInTransferTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.ExpenditureGoodInTransfer;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get PriceExpenditureGoodInTransferTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.ExpenditureGoodInTransferPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get ExpenditureGoodReturTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.ExpenditureGoodRetur;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get PriceExpenditureGoodReturTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.ExpenditureGoodReturPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get ExportQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.ExportQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get ExportPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.ExportPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get OtherQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.OtherQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get OtherPriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.OtherPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }      
    get SampleQtyTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.SampleQty;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get SamplePriceTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.SamplePrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get ExpenditureGoodAdjTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.ExpenditureGoodAdj;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get PriceExpenditureGoodAdjTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.ExpenditureGoodAdjPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get EndBalanceExpenditureGoodTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalanceExpenditureGood;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }   
    get PriceEndBalanceExpenditureGoodTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.EndBalanceExpenditureGoodPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get MaterialUsageTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingInExpenditure * item.BasicPrice;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  

    get PriceUsageTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingInExpenditure * item.Fare;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get FareNewTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FareNew;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }  
    get CuttingNewTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.CuttingNew;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get LoadingNewTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.LoadingNew;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get SewingNewTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.SewingNew;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    } 
    get FinishingNewTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.FinishingNew;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get SubconNewTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.SubconNew;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }
    get ExpenditureNewTotal()
    {
        var sum=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            sum += item.ExpenditureNew;
        }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
    }

    UnitItemChanged(newvalue){
        // console.log(newvalue);
        if (newvalue) {
            if (newvalue === "KONFEKSI 2A") {
                this.unit = 45;
                this.unitname = "KONFEKSI 2A";
            }
            else if (newvalue === "KONFEKSI 2B") {
                this.unit = 46;
                this.unitname = "KONFEKSI 2B";
            }
            else if (newvalue === "KONFEKSI 2C") {
                this.unit = 47;
                this.unitname = "KONFEKSI 2C";
            }else if(newvalue === "KONFEKSI 1A"){
                this.unit = 51;
                this.unitname = "KONFEKSI 1A";
            }else if(newvalue === "KONFEKSI 1B"){
                this.unit = 52;
                this.unitname = "KONFEKSI 1B";
            }else{
                this.unit = 0;
                this.unitname = "";
            }
        }else{
            this.unit = 0;
            this.unitname = "";
        }
    }

    reset() {
        this.ro = null;
        this.date  = null;
        this.unit = null;
    }
}