module.exports = [
  {
    route: '/garment-finance/garment-purchasing-to-verification',
    name: 'garment-purchasing-to-verification',
    moduleId: './modules/garment-finance/garment-purchasing-to-verification/index',
    nav: true,
    title: 'Ekspedisi Penyerahan ke Verifikasi',
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi ni",
      permission: { "B11": 1, "C9": 1, "PG": 1, "APG": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-finance/garment-purchasing-document-expedition-acceptance',
    name: 'garment-purchasing-document-expedition-acceptance',
    moduleId: './modules/garment-finance/garment-purchasing-document-expedition-acceptance/index',
    nav: true,
    title: 'Penerimaan Dokumen Pembelian Garment',
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi ni",
      permission: { "B13": 1, "C9": 1, "B12": 1, "B11": 1, "PG": 1, "APG": 1, "B9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-finance/garment-purchasing-verification',
    name: 'garment-purchasing-verification',
    moduleId: './modules/garment-finance/garment-purchasing-verification/index',
    nav: true,
    title: 'Verifikasi Nota Intern',
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi ni",
      permission: { "B13": 1, "C9": 1, "B9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-finance/garment-purchasing-expedition-report',
    name: 'garment-purchasing-expedition-report',
    moduleId: './modules/garment-finance/garment-purchasing-expedition-report/index',
    nav: true,
    title: 'Laporan Ekspedisi Pembelian Garment',
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi ni",
      permission: { "B13": 1, "C9": 1, "B12": 1, "B11": 1, "PG": 1, "APG": 1, "B9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/dpp-vat-bank-expenditure-note",
    name: "garment-finance-dpp-vat-bank-expenditure-note",
    moduleId: "./modules/garment-finance/dpp-vat-bank-expenditure-note/index",
    nav: true,
    title: "Bukti Pengeluaran Bank DPP + PPN",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi ni",
      permission: { "C9": 1, "B4": 1, "B11": 1 },
      iconClass: 'fa fa-dashboard'
    },
  },
  {
    route: "/garment-finance/garment-bank-expenditure-note-dpp-ppn-report",
    name: "garment-bank-expenditure-note-dpp-ppn-report",
    moduleId:
      "./modules/garment-finance/garment-bank-expenditure-note-dpp-ppn-report/index",
    nav: true,
    title: "Laporan Bukti Pengeluaran Bank DPP + PPN",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi ni",
      permission: { "C9": 1, "B4": 1, "B11": 1 },
      iconClass: 'fa fa-dashboard'
    },
  },
  {
    route: "/garment-finance/garment-purchasing-pph-bank-expenditure-note",
    name: "garment-purchasing-pph-bank-expenditure-note",
    moduleId: "./modules/garment-finance/garment-purchasing-pph-bank-expenditure-note/index",
    nav: true,
    title: "Pengajuan Pembayaran PPH",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi ni",
      permission: { "C9": 1, "B4": 1, "B11": 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-finance/garment-pph-bank-expenditure-note-report",
    name: "garment-pph-bank-expenditure-note-report",
    moduleId: "./modules/garment-finance/garment-pph-bank-expenditure-note-report/index",
    nav: true,
    title: "Laporan Pengajuan Pembayaran PPH",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi ni",
      permission: { "C9": 1, "B4": 1, "B11": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/garment-disposition-to-verification",
    name: "garment-disposition-to-verification",
    moduleId: "./modules/garment-finance/garment-disposition-to-verification/index",
    nav: true,
    title: "Ekspedisi Penyerahan Disposisi ke Verifikasi",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: {
        PG: 1,
        APG: 1,
        C9: 1,
      },
      iconClass: "fa fa-clone",
    }
  },
  {
    route: "/garment-finance/garment-disposition-verification",
    name: "garment-disposition-verification",
    moduleId: "./modules/garment-finance/garment-disposition-verification/index",
    nav: true,
    title: "Verifikasi Disposisi Garment",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: {
        B9: 1,
        B13: 1,
        B4: 1,
        B11: 1,
        C9: 1,
      },
      iconClass: "fa fa-clone",
    },
  },
  {
    route: "garment-finance/garment-disposition-document-expedition-acceptance",
    name: "garment-disposition-document-expedition-acceptance",
    moduleId: "./modules/garment-finance/garment-disposition-document-expedition-acceptance/index",
    nav: true,
    title: "Penerimaan Dokumen Disposisi Pembayaran",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "C9": 1, "PG": 1, "APG": 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  // {
  //   route: "/garment-finance/reports/garment-down-payment",
  //   name: "garment-down-payment",
  //   moduleId: "./modules/garment-finance/reports/garment-down-payment/index",
  //   nav: true,
  //   title: "Laporan Uang Muka",
  //   auth: true,
  //   settings: {
  //     group: "g-finance",
  //     subGroup: "ekspedisi disposisi",
  //     permission: {
  //       P1: 1,
  //       P2: 1,
  //       P3: 1,
  //       P4: 1,
  //       P5: 1,
  //       P6: 1,
  //       P7: 1,
  //       PI: 1,
  //       PG: 1,
  //       PK: 1,
  //       C9: 1,
  //     },
  //     iconClass: "fa fa-clone",
  //   }
  // },
  {
    route: "/garment-finance/payment-disposition-note",
    name: "payment-disposition-note",
    moduleId: "./modules/garment-finance/payment-disposition-note/index",
    nav: true,
    title: "Bukti Pembayaran Disposisi",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/reports/garment-disposition-payment-expedition",
    name: "garment-disposition-payment-expedition-report",
    moduleId: "./modules/garment-finance/reports/garment-disposition-payment-expedition/index",
    nav: true,
    title: "Laporan Ekspedisi Disposisi Pembayaran",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/reports/down-payment-report",
    name: "down-paymant-report",
    moduleId: "./modules/garment-finance/reports/down-payment-report/index",
    nav: true,
    title: "Laporan Uang Muka",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "/garment-finance/garment-purchasing-debt-balance",
    name: "garment-purchasing-debt-balance",
    moduleId: "./modules/garment-finance/garment-purchasing-debt-balance/index",
    nav: true,
    title: "Kartu Hutang",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report",
      permission: { "C9": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/reports/garment-debt-balance-local",
    name: "garment-debt-balance-local",
    moduleId: "./modules/garment-finance/reports/garment-debt-balance-local/index",
    nav: true,
    title: "Saldo Hutang Lokal",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report",
      permission: { "B13": 1, "C9": 1 , "B4": 1, "B11": 1, "B1": 1, "B12": 1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/reports/garment-purchasing-debt-balance-local-foreign",
    name: "garment-purchasing-debt-balance-local-foreign",
    moduleId: "./modules/garment-finance/reports/garment-purchasing-debt-balance-local-foreign/index",
    nav: true,
    title: "Saldo Hutang Lokal Valas",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report",
      permission: { "B13": 1, "C9": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/reports/garment-debt-balance-import",
    name: "garment-debt-balance-import",
    moduleId: "./modules/garment-finance/reports/garment-debt-balance-import/index",
    nav: true,
    title: "Saldo Hutang Impor",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report",
      permission: { "B13": 1, "C9": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/reports/garment-debt-detail-report",
    name: "garment-debt-detail-report",
    moduleId: "./modules/garment-finance/reports/garment-debt-detail-report/index",
    nav: true,
    title: "Laporan Rincian Hutang",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report",
      permission: { "B13": 1, "C9": 1 , "B4": 1, "B11": 1, "B1": 1, "B12": 1},
      iconClass: 'fa fa-dashboard'
    }
  },
  // {
  //     route: '/garment-finance/garment-purchasing-expedition-report',
  //     name: 'garment-purchasing-expedition-report',
  //     moduleId: './modules/garment-finance/garment-purchasing-expedition-report/index',
  //     nav: true,
  //     title: 'Laporan Ekspedisi Pembelian Garment',
  //     auth: true,
  //     settings: {
  //         group: "g-finance",
  //         permission: { "B13": 1, "C9": 1 },
  //         iconClass: 'fa fa-dashboard'
  //     }
  // },
  {
    route: "garment-finance/bank-cash/bank-cash-receipts",
    name: "bank-cash-receipts",
    moduleId: "./modules/garment-finance/bank-cash/bank-cash-receipts/index",
    nav: true,
    title: "Penerimaan Kas Bank",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/bank-cash/bank-cash-receipt-details-memo",
    name: "bank-cash-receipt-details",
    moduleId: "./modules/garment-finance/bank-cash/bank-cash-receipt-details-memo/index",
    nav: true,
    title: "Rincian Penerimaan Kas Bank - Export",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/bank-cash/report/debtor-card-report",
    name: "debtor-card-report",
    moduleId: "./modules/garment-finance/bank-cash/report/debtor-card-report/index",
    nav: true,
    title: "Report Kartu Debitur Export",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/reports/export-sales-debtor-report",
    name: "export-sales-debtor-report",
    moduleId: "./modules/garment-finance/reports/export-sales-debtor-report/index",
    nav: true,
    title: "Laporan Debitur Penjualan Export",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/reports/export-sales-debtor-IDR-report",
    name: "export-sales-debtor-report",
    moduleId: "./modules/garment-finance/reports/export-sales-debtor-IDR-report/index",
    nav: true,
    title: "Laporan Debitur Penjualan Export (IDR)",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/reports/export-sales-debtor-summary-report",
    name: "export-sales-debtor-report",
    moduleId: "./modules/garment-finance/reports/export-sales-debtor-summary-report/index",
    nav: true,
    title: "Laporan Saldo Akhir Debitur Penjualan Export ",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/memorials",
    name: "memorials",
    moduleId: "./modules/garment-finance/bank-cash/memorial/index",
    nav: true,
    title: "Memorial",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/bank-cash/memorial-detail",
    name: "memorial-details",
    moduleId: "./modules/garment-finance/bank-cash/memorial-detail/index",
    nav: true,
    title: "Rincian Memorial - Export",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/report/export-sales-journal",
    name: "export-sales-journal",
    moduleId: "./modules/garment-finance/bank-cash/report/export-sales-journal/index",
    nav: true,
    title: "Jurnal Penjualan Export",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
      route: "garment-finance/local-sales-note-approval",
      name: "garment-finance/local-sales-note-approval",
      moduleId: "modules/garment-finance/local-sales-note-approval/index",
      nav: true,
      title: "Approval Penjualan Lokal",
      auth: true,
      settings: {
          group: "g-finance",
          subGroup: "approval",
          permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
          iconClass: "fa fa-dashboard"
      }
  },
  {
    route: "garment-finance/bank-cash/bank-cash-receipt-detail-locals",
    name: "bank-cash-receipt-detail-locals",
    moduleId: "./modules/garment-finance/bank-cash/bank-cash-receipt-detail-locals/index",
    nav: true,
    title: "Rincian Penerimaan Kas Bank - Lokal",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/memorial-detail-local",
    name: "memorial-details-local",
    moduleId: "./modules/garment-finance/bank-cash/memorial-detail-local/index",
    nav: true,
    title: "Rincian Memorial - Lokal",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/reports/export-sales-outstanding-report",
    name: "export-sales-outstanding",
    moduleId: "./modules/garment-finance/reports/export-sales-outstanding-report/index",
    nav: true,
    title: "Laporan Outstanding Penjualan Export ",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/report/bank-cash-receipt-monthly-recap",
    name: "bank-cash-receipt-monthly-recap",
    moduleId: "./modules/garment-finance/bank-cash/report/bank-cash-receipt-monthly-recap/index",
    nav: true,
    title: "Rekap Memo per Bulan - Export",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/bank-cash/report/local-debtor-card-report",
    name: "local-debtor-card-report",
    moduleId: "./modules/garment-finance/bank-cash/report/local-debtor-card-report/index",
    nav: true,
    title: "Report Kartu Debitur Lokal",
    auth: true,
      settings: {
          group: "g-finance",
          subGroup: "report kas bank",
          permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
          iconClass: "fa fa-dashboard"
      }
  },
  {
    route: "garment-finance/report/local-bank-cash-receipt-monthly-recap",
    name: "local-bank-cash-receipt-monthly-recap",
    moduleId: "./modules/garment-finance/bank-cash/report/local-bank-cash-receipt-monthly-recap/index",
    nav: true,
    title: "Rekap Memo per Bulan - Lokal",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/report/local-sales-journal",
    name: "local-sales-journal",
    moduleId: "./modules/garment-finance/bank-cash/report/local-sales-journal/index",
    nav: true,
    title: "Jurnal Penjualan Lokal",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/report/local-sales-debtor-report",
    name: "local-sales-debtor-report",
    moduleId: "./modules/garment-finance/reports/local-sales-debtor-report/index",
    nav: true,
    title: "Laporan Debitur Penjualan Lokal",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/report/local-sales-debtor-summary-report",
    name: "local-sales-debtor-summary-report",
    moduleId: "./modules/garment-finance/bank-cash/report/local-sales-debtor-summary-report/index",
    nav: true,
    title: "Laporan Saldo Akhir Debitur Penjualan Lokal",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/reports/local-sales-outstanding-report",
    name: "local-sales-outstanding",
    moduleId: "./modules/garment-finance/bank-cash/report/local-outstanding-sales-report/index",
    nav: true,
    title: "Laporan Outstanding Penjualan Lokal ",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "report kas bank",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/reports/garment-monitoring-disposition-payment",
    name: "down-paymant-report",
    moduleId: "./modules/garment-finance/reports/garment-monitoring-disposition-payment/index",
    nav: true,
    title: "Laporan Bukti Pembayaran Disposisi",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: { "B9": 1, "B13": 1, "B4": 1, "B11": 1, "B1": 1, "B12": 1, "PG": 1, "APG": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
]
