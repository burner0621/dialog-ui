import { inject } from "aurelia-framework";
import { Service } from "./service";
import { CurrencyService } from "./currency-service";
import { Router } from "aurelia-router";
import moment from "moment";

var UnitLoader = require("../../../../loader/unit-loader");

@inject(Router, Service, CurrencyService)
export class List {
  constructor(router, service, currencyService) {
    this.service = service;
    this.router = router;
    this.currencyService = currencyService;
    this.error = {};
    this.unit = "";
    this.date = null;
    this.isEmpty = true;
    this.isEdit = false;
    this.collectionOptions = {
      readOnly: true,
    };
    this.rowSpan = {};
    this.total = {
      oaci: [],
      oaco: [],
      oadiff: [],
      iaci: [],
      iaco: [],
      iadiff: [],
      faci: [],
      faco: [],
      fadiff: [],
      cashdiff: [],
      eqdiff: [],
    };
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  collection = {
    columns: [
      "MATA UANG",
      "NOMINAL VALAS (BEST CASE)",
      "NOMINAL IDR (BEST CASE)",
      "ACTUAL IDR (BEST CASE)",
      "NOMINAL VALAS (WORST CASE)",
      "NOMINAL IDR (WORST CASE)",
      "ACTUAL IDR (WORST CASE)",
    ],
  };

  enums = [
    "ExportSales",
    "LocalSales",
    "CashSales",
    "InteralDivisionSales",
    "InternalUnitSales",
    "InternalIncomeVATCalculation",
    "OthersSales",
    "ExternalIncomeVATCalculation",
    "ImportedRawMaterial",
    "LocalRawMaterial",
    "EmployeeExpenses", // Missing before
    "AuxiliaryMaterial",
    "SubCount",
    "Embalage",
    "Electricity",
    "Coal",
    "FuelOil",
    "SparePartsMachineMaintenance",
    "DirectLaborCost",
    "HolidayAllowanceLaborCost",
    "ConsultantCost",
    "HealthInsuranceSocialSecurity",
    "SeveranceCost",
    "UtilityCost",
    "ImportCost",
    "InternalDivisionPurchase",
    "InternalUnitPurchase",
    "InternalOutcomeVATCalculation",
    "MarketingSalaryCost",
    "MarketingSalaryExpense",
    "MarketingHealthInsuranceSocialSecurity",
    "MarketingHolidayAllowance",
    "AdvertisementCost",
    "BusinessTripCost",
    "ShippingCost",
    "SalesComission",
    "FreightCost",
    "ClaimCost",
    "DocumentationCost",
    "InsuranceCost",
    "OtherSalesCost",
    "GeneralAdministrativeExternalOutcomeVATCalculation",
    "TaxCost",
    "GeneralAdministrativeSalaryCost",
    "GeneralAdministrativeSalaryExpense",
    "GeneralAdministrativeSocialSecurity",
    "GeneralAdministrativeDirectorsSalary",
    "GeneralAdministrativeBuildingMaintenance",
    "GeneralAdministrativeBusinessTrip",
    "GeneralAdministrativeMailingCost",
    "GeneralAdministrativeStationary",
    "GeneralAdministrativeWaterCost",
    "GeneralAdministrativeElectricityCost",
    "GeneralAdministrativeConsultant",
    "GeneralAdministrativeTraining",
    "GeneralAdministrativeCertification",
    "GeneralAdministrativeDonation",
    "GeneralAdministrativeGuestEntertainment",
    "GeneralAdministrativeVehicleBuildingMachineInsurance",
    "GeneralAdministrativeCorporateHousehold",
    "GeneralAdministrativeSeveranceCost",
    "GeneralAdministrativeHolidayAllowance",
    "GeneralAdministrativeVehicleCost",
    "GeneralAdministrativeSecurityCost",
    "GeneralAdministrativeOthersCost",
    "GeneralAdministrativeCommunicationCost",
    "OthersOperationalCost",
    "CashInDeposit",
    "CashInOthers",
    "MachineryPurchase",
    "VehiclePurchase",
    "InventoryPurchase",
    "ComputerToolsPurchase",
    // "ProductionToolsMaterialsPurchase",
    "ProjectPurchase",
    "CashOutDesposit",
    "CashInLoanWithdrawal", // Missing before
    "CashInAffiliates",
    "CashInForexTrading",
    "CashInCompanyReserves",
    "CashInLoanWithdrawalOthers",
    "CashOutInstallments",
    "CashOutBankInterest",
    "CashOutBankAdministrationFee",
    "CashOutAffiliates",
    "CashOutForexTrading",
    "CashOutOthers",
  ];

  bind() {
    this.data = {};
  }

  async search() {
    this.collectionOptions = {
      readOnly: true,
    };

    if (this.unit === "" || this.date === null) {
      this.error.unit = "Unit harus diisi";
      this.error.date = "Periode harus diisi";
    } else {
      this.error.unit = "";
      this.error.date = "";

      let unitId = 0;
      if (this.unit && this.unit.Id) {
        unitId = this.unit.Id;
        this.data.UnitId = this.unit.Id;
      }

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.data.DueDate = date;

      let bestCasePromises = this.enums.map((enumItem, index) => {
        return this.service
          .getBestCase({
            layoutOrder: index + 1,
            unitId: unitId,
            date: date,
          })
          .then((bestCases) => {
            return bestCases;
          });
      });

      let worstCaseResult = await this.service
        .getWorstCase({ unitId: unitId, date: date })
        .then((worstCases) => {
          return worstCases;
        });

      let totalOACI = await this.service
        .getOACI({ unitId: unitId, date: date })
        .then((result) => result);

      let totalOACO = await this.service
        .getOACO({ unitId: unitId, date: date })
        .then((result) => result);

      let totalOADiff = await this.service
        .getOADiff({ unitId: unitId, date: date })
        .then((result) => result);

      let totalIACI = await this.service
        .getIACI({ unitId: unitId, date: date })
        .then((result) => result);

      let totalIACO = await this.service
        .getIACO({ unitId: unitId, date: date })
        .then((result) => result);

      let totalIADiff = await this.service
        .getIADiff({ unitId: unitId, date: date })
        .then((result) => result);

      let totalFACI = await this.service
        .getFACI({ unitId: unitId, date: date })
        .then((result) => result);

      let totalFACO = await this.service
        .getFACO({ unitId: unitId, date: date })
        .then((result) => result);

      let totalFADiff = await this.service
        .getFADiff({ unitId: unitId, date: date })
        .then((result) => result);

      await Promise.all(bestCasePromises).then((bestCasePromiseResult) => {
        let bestCaseResult = bestCasePromiseResult;

        let bestCases = bestCaseResult.map((response) => {
          if (!response.data || response.data.length <= 0) {
            response.data = [{}];
          }

          return response.data;
        });

        bestCases = [].concat.apply([], bestCases);

        let currencyPromises = [];
        for (let bestCase of bestCases) {
          if (bestCase.CurrencyId && bestCase.CurrencyId > 0) {
            currencyPromises.push(
              this.currencyService.getById(bestCase.CurrencyId)
            );
          }
        }

        return Promise.all(currencyPromises).then((currencyPromiseResult) => {
          let currencies = currencyPromiseResult;

          let worstCases = [];
          if (worstCaseResult) worstCases = worstCaseResult.data;

          this.total.oaci = totalOACI.data.map((datum) => {
            let currency = currencies.find(
              (c) => c && c.Id == datum.CurrencyId
            );
            datum.Currency = currency;
            return datum;
          });
          this.total.oaco = totalOACO.data.map((datum) => {
            let currency = currencies.find(
              (c) => c && c.Id == datum.CurrencyId
            );
            datum.Currency = currency;
            return datum;
          });
          this.total.oadiff = totalOADiff.data.map((datum) => {
            let currency = currencies.find(
              (c) => c && c.Id == datum.CurrencyId
            );
            datum.Currency = currency;
            return datum;
          });
          this.total.iaci = totalIACI.data.map((datum) => {
            let currency = currencies.find(
              (c) => c && c.Id == datum.CurrencyId
            );
            datum.Currency = currency;
            return datum;
          });
          this.total.iaco = totalIACO.data.map((datum) => {
            let currency = currencies.find(
              (c) => c && c.Id == datum.CurrencyId
            );
            datum.Currency = currency;
            return datum;
          });
          this.total.iadiff = totalIADiff.data.map((datum) => {
            let currency = currencies.find(
              (c) => c && c.Id == datum.CurrencyId
            );
            datum.Currency = currency;
            return datum;
          });
          this.total.faci = totalFACI.data.map((datum) => {
            let currency = currencies.find(
              (c) => c && c.Id == datum.CurrencyId
            );
            datum.Currency = currency;
            return datum;
          });
          this.total.faco = totalFACO.data.map((datum) => {
            let currency = currencies.find(
              (c) => c && c.Id == datum.CurrencyId
            );
            datum.Currency = currency;
            return datum;
          });
          this.total.fadiff = totalFADiff.data.map((datum) => {
            let currency = currencies.find(
              (c) => c && c.Id == datum.CurrencyId
            );
            datum.Currency = currency;
            return datum;
          });

          // ini data yang akan di submit
          this.data.Items = [];
          for (let bestCase of bestCases) {
            let worstCase = worstCases.find(
              (wc) =>
                wc.LayoutOrder == bestCase.LayoutOrder &&
                wc.CurrencyId == bestCase.CurrencyId
            );
            let currency = currencies.find(
              (c) => c && c.Id == bestCase.CurrencyId
            );

            if (worstCase) {
              this.data.Items.push({
                CurrencyId: bestCase.CurrencyId,
                Currency: currency,
                BestCaseCurrencyNominal: bestCase.CurrencyNominal,
                BestCaseNominal: bestCase.Nominal,
                BestCaseActualNominal: bestCase.ActualNominal,
                CurrencyNominal: worstCase.CurrencyNominal,
                Nominal: worstCase.Nominal,
                ActualNominal: worstCase.ActualNominal,
                LayoutOrder: bestCase.LayoutOrder,
                LayoutName: bestCase.LayoutName,
                IsHasBestCase: true,
              });
            } else {
              if (bestCase.LayoutOrder > 0) {
                this.data.Items.push({
                  CurrencyId: bestCase.CurrencyId,
                  Currency: currency,
                  BestCaseCurrencyNominal: bestCase.CurrencyNominal,
                  BestCaseNominal: bestCase.Nominal,
                  BestCaseActualNominal: bestCase.ActualNominal,
                  CurrencyNominal: 0,
                  Nominal: 0,
                  ActualNominal: 0,
                  LayoutOrder: bestCase.LayoutOrder,
                  LayoutName: bestCase.LayoutName,
                  IsHasBestCase: true,
                });
              } else {
                this.data.Items.push({
                  CurrencyId: bestCase.CurrencyId,
                  Currency: currency,
                  BestCaseCurrencyNominal: bestCase.CurrencyNominal,
                  BestCaseNominal: bestCase.Nominal,
                  BestCaseActualNominal: bestCase.ActualNominal,
                  CurrencyNominal: 0,
                  Nominal: 0,
                  ActualNominal: 0,
                  LayoutOrder: bestCase.LayoutOrder,
                  LayoutName: bestCase.LayoutName,
                  IsHasBestCase: false,
                });
              }
            }
          }
        });
      });

      const getItem = (min, max) => (item) =>
        item.LayoutOrder >= min && item.LayoutOrder <= max;

      // OPERATING ACTIVITIES
      const revenue = this.data.Items.filter(getItem(1, 6));
      const otherRevenue = this.data.Items.filter(getItem(7, 8));
      const cogSold = this.data.Items.filter(getItem(9, 28));
      const sellingExpenses = this.data.Items.filter(getItem(29, 41));
      const gaExpenses = this.data.Items.filter(getItem(42, 43));
      const generalExpenses = this.data.Items.filter(getItem(44, 65));
      const telpExpenses = this.data.Items.filter(getItem(66, 66));
      const otherExpenses = this.data.Items.filter(getItem(67, 67));

      // INVESTING ACTIVITIES
      const depoInAndOthers = this.data.Items.filter(getItem(68, 69));
      const assetTetap = this.data.Items.filter(getItem(70, 75));
      const depoOut = this.data.Items.filter(getItem(76, 76));

      // FINANCING ACTIVITIES
      const loanWithdrawal = this.data.Items.filter(getItem(77, 77));
      const othersCI = this.data.Items.filter(getItem(78, 81));
      const loanInstallment = this.data.Items.filter(getItem(82, 83));
      const bankExpenses = this.data.Items.filter(getItem(84, 84));
      const othersCO = this.data.Items.filter(getItem(85, 87));

      const cashdiff = [
        ...this.total.oadiff,
        ...this.total.iadiff,
        ...this.total.fadiff,
      ];

      const tempCashdiff = [];
      cashdiff
        .filter((item) => item.CurrencyId !== 0)
        .reduce(function (res, value) {
          if (!res[value.CurrencyId]) {
            res[value.CurrencyId] = {
              CurrencyId: value.CurrencyId,
              Currency: {
                Code: value.Currency.Code,
                Rate: value.Currency.Rate,
              },
              ActualNominal: 0,
              BestCaseActualNominal: 0,
              BestCaseCurrencyNominal: 0,
              BestCaseNominal: 0,
              CurrencyNominal: 0,
              Nominal: 0,
            };
            tempCashdiff.push(res[value.CurrencyId]);
          }
          res[value.CurrencyId].ActualNominal += value.ActualNominal;
          res[value.CurrencyId].BestCaseActualNominal +=
            value.BestCaseActualNominal;
          res[value.CurrencyId].BestCaseCurrencyNominal +=
            value.BestCaseCurrencyNominal;
          res[value.CurrencyId].BestCaseNominal += value.BestCaseNominal;
          res[value.CurrencyId].CurrencyNominal += value.CurrencyNominal;
          res[value.CurrencyId].Nominal += value.Nominal;
          return res;
        }, {});

      this.total.cashdiff = tempCashdiff;

      const tempEqDiff = tempCashdiff.map((item) => {
        return {
          ActualNominal: item.ActualNominal * item.Currency.Rate,
          BestCaseActualNominal:
            item.BestCaseActualNominal * item.Currency.Rate,
          BestCaseCurrencyNominal:
            item.BestCaseCurrencyNominal * item.Currency.Rate,
          BestCaseNominal: item.BestCaseNominal * item.Currency.Rate,
          CurrencyNominal: item.CurrencyNominal * item.Currency.Rate,
          Nominal: item.Nominal * item.Currency.Rate,
        };
      });

      const eqDiff = tempEqDiff.reduce(function (previousValue, currentValue) {
        return {
          ActualNominal:
            previousValue.ActualNominal + currentValue.ActualNominal,
          BestCaseActualNominal:
            previousValue.BestCaseActualNominal +
            currentValue.BestCaseActualNominal,
          BestCaseCurrencyNominal:
            previousValue.BestCaseCurrencyNominal +
            currentValue.BestCaseCurrencyNominal,
          BestCaseNominal:
            previousValue.BestCaseNominal + currentValue.BestCaseNominal,
          CurrencyNominal:
            previousValue.CurrencyNominal + currentValue.CurrencyNominal,
          Nominal: previousValue.Nominal + currentValue.Nominal,
          Currency: {
            Code: "IDR",
          },
        };
      });

      this.total.eqdiff = eqDiff;

      const joined = [
        "Pendapatan Operasional:",
        ...revenue,
        "Pendapatan Operasional Lain-lain:",
        ...otherRevenue,
        ...this.total.oaci,
        "HPP/Biaya Produksi:",
        ...cogSold,
        " ",
        "Biaya Penjualan:",
        ...sellingExpenses,
        "Biaya Administrasi & Umum:",
        ...gaExpenses,
        "Biaya umum dan administrasi",
        ...generalExpenses,
        ...telpExpenses,
        "Biaya Operasional Lain-lain:",
        ...otherExpenses,
        ...this.total.oaco,
        ...this.total.oadiff,
        "Penerimaan dari Investasi:",
        ...depoInAndOthers,
        ...this.total.iaci,
        "Pembayaran pembelian asset tetap:",
        ...assetTetap,
        ...depoOut,
        ...this.total.iaco,
        ...this.total.iadiff,
        "Penerimaan dari Pendanaan:",
        ...loanWithdrawal,
        "Penerimaan lain-lain dari pendanaan:",
        ...othersCI,
        ...this.total.faci,
        "Pembayaran angsuran dan bunga Pinjaman:",
        ...loanInstallment,
        "Pembayaran Biaya Administrasi Bank:",
        ...bankExpenses,
        "Pengeluaran lain-lain dari Pendanaan:",
        ...othersCO,
        ...this.total.faco,
        ...this.total.fadiff,
        "Saldo Awal Kas",
        ...this.total.cashdiff,
        "Saldo Akhir Kas",
        "Saldo Real Kas",
        "Selisih",
        "Rate $",
        ...this.total.eqdiff,
      ];

      this.isEmpty = this.data.Items.length !== 0 ? false : true;
      this.data.Items = joined;

      // console.log("this.data.Items", this.data.Items);
      // console.log("this.total", this.total);
      // console.log("tempEqDiff", tempEqDiff);
      // console.log("eqDiff", eqDiff);

      const itemsNoString = this.data.Items.filter(
        (item) => typeof item !== "string" && item.LayoutOrder !== 0
      );

      const rowSpan = itemsNoString
        .map((item) => {
          return {
            count: 1,
            layoutOrder: item.LayoutOrder,
          };
        })
        .reduce((a, b) => {
          a[b.layoutOrder] = (a[b.layoutOrder] || 0) + b.count;
          return a;
        }, {});

      this.rowSpan = rowSpan;

      const rowSpanArr = Object.values(rowSpan);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      const oaciRowSpan =
        rowSpanArr.slice(0, 8).reduce(reducer, 2) + this.total.oaci.length;
      const oacoRowSpan =
        rowSpanArr.slice(8, 67).reduce(reducer, 6) + this.total.oaco.length;
      const iaciRowSpan =
        rowSpanArr.slice(67, 69).reduce(reducer, 1) + this.total.iaci.length;
      const iacoRowSpan =
        rowSpanArr.slice(69, 75).reduce(reducer, 1) + this.total.iaco.length;
      const faciRowSpan =
        rowSpanArr.slice(75, 80).reduce(reducer, 2) + this.total.faci.length;
      const facoRowSpan =
        rowSpanArr.slice(80, 86).reduce(reducer, 3) + this.total.faco.length;

      this.calRowSpan = {
        oaciRowSpan,
        oacoRowSpan,
        iaciRowSpan,
        iacoRowSpan,
        faciRowSpan,
        facoRowSpan,
        oaRowSpan: oaciRowSpan + oacoRowSpan + this.total.oadiff.length,
        iaRowSpan: iaciRowSpan + iacoRowSpan + this.total.iadiff.length,
        faRowSpan: faciRowSpan + facoRowSpan + this.total.fadiff.length,
      };
    }
  }

  reset() {
    this.unit = "";
    this.date = null;
  }

  save() {
    const tempDataItems = this.data.Items;
    const newDataItems = this.data.Items.filter(
      (item) => typeof item !== "string" && item.LayoutOrder !== 0
    );
    this.data.Items = newDataItems;
    this.service
      .upsertWorstCase(this.data)
      .then(() => {
        this.isEdit = false;
        this.collectionOptions = {
          readOnly: true,
        };

        setTimeout(() => {
          this.ItemsCollection.bind();
        }, 50);

        this.data.Items = tempDataItems;
        alert("Data berhasil disimpan.");
      })
      .catch((e) => {
        this.data.Items = tempDataItems;
        alert("Terjadi kesalahan.");
      });
  }

  edit() {
    this.isEdit = true;
    this.collectionOptions = {
      readOnly: false,
    };

    setTimeout(() => {
      this.ItemsCollection.bind();
    }, 50);
  }

  get unitLoader() {
    return UnitLoader;
  }

  printXls() {
    if (this.unit === "" || this.date === null) {
      this.error.unit = "Unit harus diisi";
      this.error.date = "Periode harus diisi";
    } else {
      this.error.unit = "";
      this.error.date = "";

      let unitId = 0;
      if (this.unit && this.unit.Id) {
        unitId = this.unit.Id;
      }

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.service.getXls({ unitId, date });
    }
  }

  printPdf() {
    if (this.unit === "" || this.date === null) {
      this.error.unit = "Unit harus diisi";
      this.error.date = "Periode harus diisi";
    } else {
      this.error.unit = "";
      this.error.date = "";

      let unitId = 0;
      if (this.unit && this.unit.Id) {
        unitId = this.unit.Id;
      }

      let date = this.date
        ? moment(this.date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");

      this.service.getPdf({ unitId, date });
    }
  }
}
