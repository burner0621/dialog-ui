import {
  inject,
  bindable
} from 'aurelia-framework';
import {
  Service
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';
import {
  index
} from '../../../samples/index';
import {
  Item
} from '../../accounting/journal-transaction/templates/item';

@inject(Router, Service)
export class List {

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  years = [];

  constructor(router, service) {
    this.service = service;
    this.router = router;

    this.currentYearItem = parseInt(moment().format('YYYY'));
    this.minYearItem = this.currentYearItem - 10;
    this.maxYearItem = this.currentYearItem + 10;

    for (var i = parseInt(this.minYearItem); i <= parseInt(this.maxYearItem); i++) {
      this.years.push(i.toString());
    }
  }

  bind() {
    this.reset();
  }

  controlOptions = {
    label: {
      length: 3
    },
    control: {
      length: 6
    }
  }

  searchWarpingProductions() {
    if (false) {
      alert("");
    } else {
      this.error = {};
      var errorIndex = 0;
      if (this.Year) {
        var YearContainer = this.Year;
      } else {
        this.error.Year = "Tahun Harus Diisi";
        errorIndex++;
      }
      if (this.Month) {
        var MonthContainer = this.Month;
      } else {
        this.error.Month = "Bulan Harus Diisi";
        errorIndex++;
      }

      var MonthInNumber = 0;

      switch (MonthContainer) {
        case "Januari":
          MonthInNumber = 1;
          break;
        case "Februari":
          MonthInNumber = 2;
          break;
        case "Maret":
          MonthInNumber = 3;
          break;
        case "April":
          MonthInNumber = 4;
          break;
        case "Mei":
          MonthInNumber = 5;
          break;
        case "Juni":
          MonthInNumber = 6;
          break;
        case "Juli":
          MonthInNumber = 7;
          break;
        case "Agustus":
          MonthInNumber = 8;
          break;
        case "September":
          MonthInNumber = 9;
          break;
        case "Oktober":
          MonthInNumber = 10;
          break;
        case "November":
          MonthInNumber = 11;
          break;
        case "Desember":
          MonthInNumber = 12;
          break;
        default:
          MonthInNumber = 0;
          break;
      }

      var arg = {
        month: MonthInNumber,
        year: YearContainer
      };
      if (errorIndex == 0) {
        this.service.getReportData(arg).then(result => {
          this.data = result.data;

          result.data._ProcessedList = [];
          var index = 1;
          for (var item of result.data.ProcessedList) {
            var productionDatum = {
              Day: index,
              TotalValue: 0,
              _DailyProcessed: []
            };

            var valueEach = 0;
            var totalValue = 0;
            for (var headerItem of result.data.Headers) {
              if (item.DailyProcessedPerOperator.length > 0) {

                var processedItemIndex = item.DailyProcessedPerOperator.findIndex(o => o.Group == headerItem.Group && o.Name == headerItem.Name);
                if (processedItemIndex >= 0) {
                  valueEach = item.DailyProcessedPerOperator[processedItemIndex].Total;
                  totalValue = totalValue + valueEach;

                  productionDatum.TotalValue = totalValue;
                  productionDatum._DailyProcessed.push({
                    Value: valueEach
                  });
                } else {
                  productionDatum._DailyProcessed.push({
                    Value: 0
                  });
                }
              } else {
                productionDatum._DailyProcessed.push({
                  Value: 0
                });
              }
            }
            result.data._ProcessedList.push(productionDatum);
            index++;
          }
          return result;
        });
      }
    }
  }

  reset() {
    this.Month = null;
    this.MonthContainer = null;
    this.MonthInNumber = null;
    this.Year = null;
    this.YearContainer = null;
    this.data = [];
  }

  exportToExcel() {
    this.error = {};
    var errorIndex = 0;
    if (this.Year) {
      var YearContainer = this.Year;
    } else {
      this.error.Year = "Tahun Harus Diisi";
      errorIndex++;
    }
    if (this.Month) {
      var MonthContainer = this.Month;
    } else {
      this.error.Month = "Bulan Harus Diisi";
      errorIndex++;
    }

    var MonthInNumber = 0;

    switch (MonthContainer) {
      case "Januari":
        MonthInNumber = 1;
        break;
      case "Februari":
        MonthInNumber = 2;
        break;
      case "Maret":
        MonthInNumber = 3;
        break;
      case "April":
        MonthInNumber = 4;
        break;
      case "Mei":
        MonthInNumber = 5;
        break;
      case "Juni":
        MonthInNumber = 6;
        break;
      case "Juli":
        MonthInNumber = 7;
        break;
      case "Agustus":
        MonthInNumber = 8;
        break;
      case "September":
        MonthInNumber = 9;
        break;
      case "Oktober":
        MonthInNumber = 10;
        break;
      case "November":
        MonthInNumber = 11;
        break;
      case "Desember":
        MonthInNumber = 12;
        break;
      default:
        MonthInNumber = 0;
        break;
    }

    if (errorIndex == 0) {
      this.service.getReportPdf(MonthInNumber, YearContainer);
    }
  }
}
