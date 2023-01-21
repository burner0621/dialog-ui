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
            // unit : this.unit ? this.unit.Id : "",
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
                    _data._QtyLoadingInTransfer = _data.QtyLoadingInTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._PriceLoading = _data.PriceLoading.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._QtyLoadingIn = _data.QtyLoadingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._PriceLoadingIn = _data.PriceLoadingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
                    _data._ExpenditureGoodRemainingPrice = _data.ExpenditureGoodRemainingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
                    _data._FinishingInExpenditurepPrice = _data.FinishingInExpenditurepPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._FareNew = _data.FareNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._LoadingNew = _data.LoadingNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._CuttingNew = _data.CuttingNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._SewingNew = _data.SewingNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._FinishingNew = _data.FinishingNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._ExpenditureNew = _data.ExpenditureNew.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._ExpenditureGoodInTransfer = _data.ExpenditureGoodInTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data._ExpenditureGoodInTransferPrice = _data.ExpenditureGoodInTransferPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    console.log(_data);

                    this.data.push(_data);

                 }
            });
    }

    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit : 0,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") :  moment(new Date()).format("YYYY-MM-DD") ,
            ro : this.ro ?this.ro:""
        }
        this.service.generateExcel(info);
    }

    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;

    }

    get AmountOrder()
    {
        var totalOrder=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            totalOrder += item.QtyOrder;
        }
        }
        return totalOrder.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
    get QtyCuttingInTotal()
    {
        var qtyCuttingInTotal=0;
        if(this.data)
        {
        for(var item of this.data)
        {
            qtyCuttingInTotal += item.QtyCuttingIn;
        }
        }
        return qtyCuttingInTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
    get QtyLoadingInTransferTotal()
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

    reset() {
        this.ro = null;
        this.date  = null;
        this.unit = null;
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
}