import {
  inject,
  bindable
} from 'aurelia-framework';
import {
  Service, ShiftService
} from "./service";
import {
  Router
} from 'aurelia-router';
import moment from 'moment';

var ShiftLoader = require('../../../loader/weaving-shift-loader');
var UnitLoader = require('../../../loader/unit-loader');

@inject(Router, Service, ShiftService)
export class List {
  @bindable Period;
  // @bindable selectedShift;

  constructor(router, service, ShiftService) {
    this.service = service;
    this.shiftService = ShiftService;
    this.router = router;
    this.ShowHideByDatePeriod = false;
    this.ShowHideByDateRangePeriod = false;
    this.ShowHideMonthlyPeriod = false;

    this.currentYearItem = parseInt(moment().format('YYYY'));
    this.minYearItem = this.currentYearItem - 10;
    this.maxYearItem = this.currentYearItem + 10;

    for (var i = parseInt(this.minYearItem); i <= parseInt(this.maxYearItem); i++) {
      this.years.push(i.toString());
    }
  }


  listDataFlag = false;

  // shifts = [""];

  years = [];

  periods = ["", "Harian", "Rekap", "Bulanan"];

  months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  pickups = ["", "Diatas Standar", "Dibawah Standar", "Sesuai Standar"];

  columns = [
    {
      field: "OrderNumber",
      title: "No SPP"
    },
    {
      field: "DateTimeMachineHistory",
      title: "Tanggal Selesai",
      formatter: function (value, data, index) {
        return moment(value).format("DD MMMM YYYY");
      }
    },
    {
      field: "OperatorGroup",
      title: "Grup Sizing"
    },
    {
      field: "OperatorName",
      title: "Operator"
    },
    {
      field: "RecipeCode",
      title: "Kode Resep"
    },
    {
      field: "MachineSpeed",
      title: "Kecepatan Mesin"
    },
    {
      field: "TexSQ",
      title: "TexSQ"
    },
    {
      field: "Visco",
      title: "Visco"
    },
    {
      field: "BeamNumber",
      title: "No. Beam"
    },
    {
      field: "PISMeter",
      title: "PIS(m)"
    },
    {
      field: "StartCounter",
      title: "Counter Awal"
    },
    {
      field: "FinishCounter",
      title: "Counter Akhir"
    },
    {
      field: "NettoWeight",
      title: "Netto"
    },
    {
      field: "BrutoWeight",
      title: "Bruto"
    },
    {
      field: "SPU",
      title: "SPU"
    },
    {
      field: "Category",
      title: "Kategori"
    },
    // {
    //   field: "DateTimeMachineHistory",
    //   title: "Waktu Doff",
    //   formatter: function (value, data, index) {
    //     return moment(value).format("HH:mm:ss");
    //   }
    // },
  ];

  controlOptions = {
    label: {
      length: 5
    },
    control: {
      length: 7
    }
  }

  startPeriodOptions = {
    label: {
      length: 5
    },
    control: {
      length: 7
    }
  }

  endPeriodOptions = {
    control: {
      length: 7
    }
  }

  tableOptions = {
    search: false,
    showToggle: false,
    showColumns: false,
    pagination: true,
    sortable: true,
  }


  PeriodChanged(newValue) {
    switch (newValue) {
      case "":
        this.ShowHideByDatePeriod = false;
        this.DatePeriod = "";
        this.ShowHideByDateRangePeriod = false;
        this.StartDatePeriod = "";
        this.EndDatePeriod = "";
        this.ShowHideMonthlyPeriod = false;
        this.MonthlyPeriod = "";
        break;
      case "Harian":
        this.ShowHideByDatePeriod = true;
        this.ShowHideByDateRangePeriod = false;
        this.StartDatePeriod = "";
        this.EndDatePeriod = "";
        this.ShowHideMonthlyPeriod = false;
        this.MonthlyPeriod = "";
        break;
      case "Rekap":
        this.ShowHideByDatePeriod = false;
        this.DatePeriod = "";
        this.ShowHideByDateRangePeriod = true;
        this.ShowHideMonthlyPeriod = false;
        this.MonthlyPeriod = "";
        break;
      case "Bulanan":
        this.ShowHideByDatePeriod = false;
        this.DatePeriod = "";
        this.ShowHideByDateRangePeriod = false;
        this.StartDatePeriod = "";
        this.EndDatePeriod = "";
        this.ShowHideMonthlyPeriod = true;
    }
  }

  get shifts() {
    return ShiftLoader;
  }

  get units() {
    return UnitLoader;
  }

  loader = (info) => {
    let order = {};
    if (info.sort) order[info.sort] = info.order;

    if (this.DatePeriod) {
      var DatePeriodContainer = this.DatePeriod ? moment(this.DatePeriod).format("MM DD YYYY") : null;
    }

    if (this.StartDatePeriod) {
      var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("MM DD YYYY") : null;
    }

    if (this.EndDatePeriod) {
      var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("MM DD YYYY") : null;
    }

    if (this.MonthlyPeriod) {
      var MonthlyPeriodContainer = this.MonthlyPeriod;
      
    }

    switch (MonthlyPeriodContainer) {
      case "Januari":
        MonthlyPeriodContainer = 1;
        break;
      case "Februari":
        MonthlyPeriodContainer = 2;
        break;
      case "Maret":
        MonthlyPeriodContainer = 3;
        break;
      case "April":
        MonthlyPeriodContainer = 4;
        break;
      case "Mei":
        MonthlyPeriodContainer = 5;
        break;
      case "Juni":
        MonthlyPeriodContainer = 6;
        break;
      case "Juli":
        MonthlyPeriodContainer = 7;
        break;
      case "Agustus":
        MonthlyPeriodContainer = 8;
        break;
      case "September":
        MonthlyPeriodContainer = 9;
        break;
      case "Oktober":
        MonthlyPeriodContainer = 10;
        break;
      case "November":
        MonthlyPeriodContainer = 11;
        break;
      case "Desember":
        MonthlyPeriodContainer = 12;
        break;
      default:
        MonthlyPeriodContainer = 0;
        break;
    }

    if (this.Year) { 
      var YearContainer = this.Year;
    }

    if (this.Shift) {
      var ShiftContainer = this.Shift.Id;
    }

    if (this.WeavingUnit) {
      var WeavingUnitIdContainer = this.WeavingUnit.Id;
    }

    var SPUContainer;
    if (this.SPU) {
      switch (this.SPU) {
        case "Diatas Standar":
          SPUContainer = "Upper Limit";

          break;
        case "Dibawah Standar":
          SPUContainer = "Lower Limit";
          break;
        case "Sesuai Standar":
          SPUContainer = "Standard";
          break;
      }
    } else {
      SPUContainer = "All"
    }

    var arg = {
      shiftId: ShiftContainer,
      spuStatus: SPUContainer,
      unitId: WeavingUnitIdContainer,
      date: DatePeriodContainer,
      dateFrom: StartDatePeriodContainer,
      dateTo: EndDatePeriodContainer,
      month: MonthlyPeriodContainer,
      year: YearContainer,

      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };
    console.log(arg);
    // console.log(this);

    return this.listDataFlag ? this.service.getReportData(arg).then(result => {
      for (var datum of result.data) {
        switch (datum.Category) {
          case "Upper Limit":
            datum.Category = "Di Atas Standar";
            break;
          case "Lower Limit":
            datum.Category = "Di Bawah Standar";
            break;
          case "Standard":
            SPUContainer = "Sesuai Standar";
            break;       
        }
      }

      return {
        data: result.data,
        total: result.info.count
      };
    }) : {
      data: {},
      total: 0
    };
  }
  

  // activate() {
  //   Promise.resolve(this.shiftService.getShiftData({}))
  //     .then(result => {
  //       this.shiftData = result.data;
  //       for (let i = 0; i < this.shiftData.length; i++) {
  //         this.shifts.push(this.shiftData[i]);
  //     }
  //     });
  // }

  searchDailyOperations() {
    if (this.Period == "Harian" && !this.DatePeriod) {
      alert("Tanggal Harus Diisi")
    } else if (this.Period == "Bulanan" && !this.MonthlyPeriod) {
      alert("Bulan dan Tahun Harus Diisi");
    } else if (this.Period == "Rekap" && !this.StartDatePeriod && !this.EndDatePeriod) {
      alert("Tanggal Rekap Harus Diisi dengan Lengkap")
    } else { 
      this.listDataFlag = true;
      this.sizePickupsTable.refresh();
    }
  }

  reset() {
    this.listDataFlag = false;

    this.SPU = null;
    this.DatePeriod = null;
    this.StartDatePeriod = null;
    this.EndDatePeriod = null;
    this.MonthlyPeriod = null;
    this.Period = null;
    this.Year = null;
    this.WeavingUnit = undefined;
    this.Shift = undefined;
    this.selectedShift = null;

    this.ShowHideByDatePeriod = false;
    this.ShowHideByDateRangePeriod = false;
    this.ShowHideMonthlyPeriod = false;

    this.StartDatePeriodContainer = null;
    this.EndDatePeriodContainer = null;
    this.MonthContainer = null;
    this.YearContainer = null;
    this.ShiftIdContainer = null;
    this.WeavingUnitIdContainer = null;

    this.sizePickupsTable.refresh();
  }

  exportToExcel() {
    if (this.DatePeriod) {
      var DatePeriodContainer = this.DatePeriod ? moment(this.DatePeriod).format("MM DD YYYY") : null;
    }

    if (this.StartDatePeriod) {
      var StartDatePeriodContainer = this.StartDatePeriod ? moment(this.StartDatePeriod).format("MM DD YYYY") : null;
    }

    if (this.EndDatePeriod) {
      var EndDatePeriodContainer = this.EndDatePeriod ? moment(this.EndDatePeriod).format("MM DD YYYY") : null;
    }

    if (this.MonthlyPeriod) {
      var MonthlyPeriodContainer = this.MonthlyPeriod;
    }

    switch (MonthlyPeriodContainer) {
      case "Januari":
        MonthlyPeriodContainer = 1;
        break;
      case "Februari":
        MonthlyPeriodContainer = 2;
        break;
      case "Maret":
        MonthlyPeriodContainer = 3;
        break;
      case "April":
        MonthlyPeriodContainer = 4;
        break;
      case "Mei":
        MonthlyPeriodContainer = 5;
        break;
      case "Juni":
        MonthlyPeriodContainer = 6;
        break;
      case "Juli":
        MonthlyPeriodContainer = 7;
        break;
      case "Agustus":
        MonthlyPeriodContainer = 8;
        break;
      case "September":
        MonthlyPeriodContainer = 9;
        break;
      case "Oktober":
        MonthlyPeriodContainer = 10;
        break;
      case "November":
        MonthlyPeriodContainer = 11;
        break;
      case "Desember":
        MonthlyPeriodContainer = 12;
        break;
      default:
        MonthlyPeriodContainer = 0;
        break;
    }

    if (this.Shift) {
      var ShiftContainer = this.Shift;
    }

    if (this.WeavingUnit) {
      var WeavingUnitContainer = this.WeavingUnit;
    }
    var SPUContainer;
    if (this.SPU) {
      switch (this.SPU) {
        case "Diatas Standar":
          SPUContainer = "Upper Limit";
          break;
        case "Dibawah Standar":
          SPUContainer = "Lower Limit";
          break;
        case "Sesuai Standar":
          SPUContainer = "Standard";
          break;
      }
    } else {
      SPUContainer = "All"
    }

    //Get All
    return this.listDataFlag ? this.service.getReportXls(ShiftContainer, SPUContainer, WeavingUnitContainer, DatePeriodContainer, StartDatePeriodContainer, EndDatePeriodContainer, MonthlyPeriodContainer).then(result => {
      // for (var datum of result) {
      //   if (datum.PreparationDate) {
      //     var InstallationDate = moment(datum.PreparationDate).format('DD/MM/YYYY');

      //     datum.PreparationDate = InstallationDate;
      //   }
      // }
      return {
        data: result,
        total: length
      };
    }) : {
      data: {},
      total: 0
    };
  }
}
