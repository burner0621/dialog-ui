import { inject, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

import "bootstrap-table";
import "bootstrap-table/dist/bootstrap-table.css";
import "bootstrap-table/dist/locale/bootstrap-table-id-ID.js";

import "../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns";
import "../../../components/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns.css";

var YearLoader = require('../../../loader/garment-master-plan-weekly-plan-year-loader');
var UnitLoader = require('../../../loader/weekly-plan-unit-loader');

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
    
    this.onContentResize = (e) => {
      this.refreshOptionsTable();
    }

  }

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  }

  attached() {
    window.addEventListener("resize", this.onContentResize);
  }

  detached() {
    window.removeEventListener("resize", this.onContentResize);
  }

  get yearLoader() {
    return YearLoader;
  }
  yearView = (year) => {
    return `${year.year}`
  }
  get unitLoader() {
    return UnitLoader;
  }
  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`
  }

  selectUnit = ["Unit"];
  @computedFrom("year")
  get filterUnit() {
    if (this.year) {
      this.unit = "";
      return { "year": this.year.year }
    }
    else {
      return { "year": 0 }
    }
  }

  searching() {

    if (!this.year) {
      alert("Tahun Harus Diisi");
    }
    else {
      var info = {
        year: this.year.year
      }
      if (this.unit) {
        info.unit = this.unit.Code
      }
      this.service.search(JSON.stringify(info))
        .then(result => {
          this.data = result;

          var units = [];
          for (var x = 0; x < this.data.length; x++) {
            for (var y = 0; y < this.data[x].Items.length; y++) {
              var unit = {
                code: this.data[x].Unit,
                remainingEH: this.data[x].Items[y].RemainingEH,
                background: 
                  this.data[x].Items[y].RemainingEH > 0 ? "#FFFF00" : // yellow
                  this.data[x].Items[y].RemainingEH < 0 ? "#F62C2C" : // red
                  "#52DF46" // green
              };
              var unitsTemp = units[y] ? units[y] : [];
              unitsTemp.push(unit);
              units[y] = unitsTemp;
            }
          }
          this.isTotal=false;
          if(unitsTemp.length>1){
            this.isTotal=true;
          }
          this.weeks = [];
          for (var x = 0; x < units.length; x++) {
            var headCount = 0;
            var remainingEH=0;
            var headCountUnit=0;
            for (var y = 0; y < units[x].length; y++) {
           
              headCount += Number(this.data[y].Items[x].Operator);
              if(units[x][y].code!="SK")
                headCountUnit += Number(this.data[y].Items[x].Operator);
              remainingEH += Number(this.data[y].Items[x].RemainingEH);
            }
            var week = {
              week: "W" + (x + 1),
              units: units[x],
              headCount: headCount,
              headCountUnit:headCountUnit,
              eh:remainingEH
            };
            this.weeks.push(week);
          }
          console.log(this.data)
          console.log(this.weeks)
          this.fillTable();
        });
    }
  }

  fillTable() {
    let columns = [
      {
        field: 'unit', title: 'UNIT'
      },
    ];

    // for(let plan of this.data) {
    //   columns.push({
    //     field: plan.Unit, title: plan.Unit,
    //     cellStyle: (cell) => { return { css: { background: cell.background, "border-left": "none" } } },
    //     formatter: (cell) => { return cell.value },
    //   });
    // }
    for(let plan of this.data) {
      columns.push({
        field: plan.Unit, title: plan.Unit,
        cellStyle: (cell) => { return { css: { background: cell.background, "border-right": "none" } } },
        formatter: (cell) => { return cell.value },
      });
    }

    if(this.isTotal) {
      columns.push({
        field: 'totalRemainingEH', title: 'Total Remaining EH'
      });
    }
    columns.push({
      field: 'headCountUnit', title: 'Head Count Unit'
    });
    columns.push({
      field: 'headCountTotal', title: 'Head Count Total'
    });

    let data = [];
    for(let week of this.weeks) {
      let rowData = {
        unit: week.week,
        totalRemainingEH: week.eh,
        headCountUnit: week.headCountUnit,
        headCountTotal: week.headCount
      };

      // for(let unit of week.units) {
      //   rowData[unit.code] = { value: unit.remainingEH, background: unit.background };
      // }
      for(let unit of week.units) {
        rowData[unit.code] = { value: unit.remainingEH, background: unit.background };
      }

      data.push(rowData);
    }

    var bootstrapTableOptions = {
      columns: columns,
      data: data,
      fixedColumns: true,
      fixedNumber: 1
    };

    bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
    $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
  }

  refreshOptionsTable() {
    var bootstrapTableOptions = {
      fixedColumns: true,
      fixedNumber: 1
    };
    bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
    $(this.table).bootstrapTable('refreshOptions', bootstrapTableOptions);
  }

  ExportToExcel() {
    if (!this.year) {
      alert("Tahun Harus Diisi");
    }
    else {
      var info = {
        year: this.year.year
      }
      if (this.unit) {
        info.unit = this.unit.Code
      }
      this.service.generateExcel(JSON.stringify(info));
    }
  }

  reset() {
    this.year = "";
    this.unit = "";
  }
}
