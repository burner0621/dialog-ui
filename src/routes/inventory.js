module.exports = [
    {
        route: 'inventory/packing-receipt',
        name: 'packing-receipt',
        moduleId: './modules/inventory/packing-receipt/index',
        nav: true,
        title: 'Penerimaan Packing Gudang Jadi',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },


    // {
    //     route: 'inventory/inventory-weaving-documents',
    //     name: 'inventory/inventory-weaving-documents',
    //     moduleId: './modules/inventory/inventory-weaving-document/index',
    //     nav: true,
    //     title: 'Penerimaan Gudang Weaving',
    //     auth: true,
    //     settings: {
    //         group: "Inventory",
    //         permission: { "*": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    // },

    {
        route: 'inventory/inventory-weaving-documents',
        name: 'inventory/inventory-weaving-documents',
        moduleId: 'modules/inventory/inventory-weaving-document/index',
        nav: true,
        title: 'Penerimaan Gudang Weaving',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/inventory-weaving-out-documents',
        name: 'inventory/inventory-weaving-out-documents',
        moduleId: 'modules/inventory/inventory-weaving-out-document/index',
        nav: true,
        title: 'Pengeluaran Gudang Weaving',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'inventory/inventory-weaving-adj-documents',
        name: 'inventory/inventory-weaving-adj-documents',
        moduleId: 'modules/inventory/inventory-weaving-adj-document/index',
        nav: true,
        title: 'Adjustment Masuk/Keluar Gudang Weaving',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'inventory/receipt-note-greige-out',
        name: 'inventory/receipt-note-greige-out',
        moduleId: 'modules/inventory/reports/receipt-note-greige-out/index',
        nav: true,
        title: 'Laporan Bon Pengeluaran Harian',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/report-recap-stock-type',
        name: 'inventory/reports/report-recap-stock-type',
        moduleId: './modules/inventory/reports/report-recap-stock-type/index',
        nav: true,
        title: 'Laporan Rekapitulasi Stock Grey - Jenis',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/stock-greige-recap-report',
        name: 'inventory/reports/stock-greige-recap-report',
        moduleId: './modules/inventory/reports/stock-greige-recap-report/index',
        nav: true,
        title: 'Laporan Rekapitulasi Stock Grey - Grade',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'inventory/reports/inventory-weaving-detail-recap',
        name: 'inventory/reports/inventory-weaving-detail-recap',
        moduleId: './modules/inventory/reports/inventory-weaving-detail-recap/index',
        nav: true,
        title: 'Laporan Rekapan Pemasukan',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },


    {

        route: 'inventory/reports/report-last-stock-greige-weaving-type',
        name: 'inventory/reports/report-last-stock-greige-weaving-type',
        moduleId: './modules/inventory/reports/report-last-stock-greige-weaving-type/index',
        nav: true,
        title: 'Laporan Saldo Akhir Gudang Greige - Jenis',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },


    // {

    //     route: 'inventory/reports/balance-report-piece-weaving',
    //     name: 'inventory/reports/balance-report-piece-weaving',
    //     moduleId: './modules/inventory/reports/balance-report-piece-weaving/index',
    //     nav: true,
    //     title: 'Laporan Saldo Akhir Gudang Greige - Piece',
    //     auth: true,
    //     settings: {
    //         group: "Inventory",
    //         subGroup: "Gudang Weaving",
    //         permission: { C9: 1, W1: 1, W2: 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    // },
    {

        route: 'inventory/reports/report-last-stock-greige-weaving-grade',
        name: 'inventory/reports/report-last-stock-greige-weaving-grade',
        moduleId: './modules/inventory/reports/report-last-stock-greige-weaving-grade/index',
        nav: true,
        title: 'Laporan Saldo Akhir Gudang Greige - Grade',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/report-stock-greige-weaving',
        name: 'inventory/reports/report-stock-greige-weaving',
        moduleId: './modules/inventory/reports/report-stock-greige-weaving/index',
        nav: true,
        title: 'Laporan Kain Grey Weaving',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'inventory/reports/report-expense-greige-weaving',
        name: 'inventory/reports/report-expense-greige-weaving',
        moduleId: './modules/inventory/reports/report-expense-greige-weaving/index',
        nav: true,
        title: 'Laporan Rincian Pengeluaran',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'inventory/reports/report-expense-recap-greige-weaving',
        name: 'inventory/reports/report-expense-recap-greige-weaving',
        moduleId: './modules/inventory/reports/report-expense-recap-greige-weaving/index',
        nav: true,
        title: 'Laporan Rekapitulasi Pengeluaran',
        auth: true,
        settings: {
            group: "Inventory",
            subGroup: "Gudang Weaving",
            permission: { C9: 1, W1: 1, W2: 1 },
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'inventory/inventory-documents',
        name: 'inventory/inventory-documents',
        moduleId: './modules/inventory/inventory-document/index',
        nav: true,
        title: 'Dokumen Inventory',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/inventory-movement-report',
        name: 'inventory/reports/inventory-movement-report',
        moduleId: './modules/inventory/reports/inventory-movement-report/index',
        nav: true,
        title: 'Laporan Stock In/Out',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/inventory-summary-report',
        name: 'inventory/reports/inventory-summary-report',
        moduleId: './modules/inventory/reports/inventory-summary-report/index',
        nav: true,
        title: 'Kartu Stok',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/fp-packing-receipt-report',
        name: 'inventory/reports/fp-packing-receipt-report',
        moduleId: './modules/inventory/reports/fp-packing-receipt-report/index',
        nav: true,
        title: 'Laporan Penerimaan Packing',
        auth: true,
        settings: {
            group: "Inventory",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/finishing-printing/fp-retur-to-qc-doc',
        name: 'inventory/finishing-printing/fp-retur-to-qc-doc',
        moduleId: './modules/inventory/finishing-printing/fp-retur-to-qc-doc/index',
        nav: true,
        title: 'Retur Barang ke QC',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }

    },
    {
        route: "inventory/finishing-printing/reports/fp-retur-to-qc-doc-report",
        name: "inventory/finishing-printing/reports/fp-retur-to-qc-doc-report",
        moduleId: "modules/inventory/finishing-printing/reports/fp-retur-to-qc-doc-report/index",
        nav: true,
        title: "Laporan Retur Barang ke QC",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/fp-shipment-document",
        name: "inventory/finishing-printing/fp-shipment-document",
        moduleId: "modules/inventory/finishing-printing/fp-shipment-document/index",
        nav: true,
        title: "Pengiriman Barang Gudang Jadi",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/shin-fp-shipment-document",
        name: "inventory/finishing-printing/shin-fp-shipment-document",
        moduleId: "modules/inventory/finishing-printing/shin-fp-shipment-document/index",
        nav: true,
        title: "Pengiriman Barang Gudang Jadi (Copy)",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/material-delivery-note",
        name: "inventory/finishing-printing/material-delivery-note",
        moduleId: "modules/inventory/finishing-printing/material-delivery-note/index",
        nav: true,
        title: "Bon Pengiriman Barang Spinning",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/material-delivery-note-weaving",
        name: "inventory/finishing-printing/material-delivery-note-weaving",
        moduleId: "modules/inventory/finishing-printing/material-delivery-note-weaving/index",
        nav: true,
        title: "Bon Pengiriman Barang Weaving",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/reports/fp-shipment-document-report",
        name: "inventory/finishing-printing/reports/fp-shipment-document-report",
        moduleId: "modules/inventory/finishing-printing/reports/fp-shipment-document-report/index",
        nav: true,
        title: "Laporan Pengiriman Barang Gudang Jadi",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/fp-retur-from-buyer",
        name: "inventory/finishing-printing/fp-retur-from-buyer",
        moduleId: "modules/inventory/finishing-printing/fp-retur-from-buyer/index",
        nav: true,
        title: "Retur Barang Dari Buyer",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/reports/fp-shiptment-delivery-buyer-report",
        name: "inventory/reports/fp-shiptment-delivery-buyer-report",
        moduleId: "modules/inventory/reports/fp-shiptment-delivery-buyer-report/index",
        nav: true,
        title: "Laporan Pengiriman Buyer",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/material-distribution-note",
        name: "inventory/finishing-printing/material-distribution-note",
        moduleId: "modules/inventory/finishing-printing/material-distribution-note/index",
        nav: true,
        title: "Bon Pengantar Greige",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/disposition-material-distribution-note",
        name: "inventory/finishing-printing/disposition-material-distribution-note",
        moduleId: "modules/inventory/finishing-printing/disposition-material-distribution-note/index",
        nav: true,
        title: "Bon Pengantar Greige Disposisi",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/stock-transfer-note",
        name: "inventory/stock-transfer-note",
        moduleId: "modules/inventory/stock-transfer-note/index",
        nav: true,
        title: "Catatan Transfer Stok",
        auth: true,
        settings: {
            group: "Inventory",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/stock-transfer-approval",
        name: "inventory/stock-transfer-approval",
        moduleId: "modules/inventory/stock-transfer-approval/index",
        nav: true,
        title: "Terima Transfer Stok",
        auth: true,
        settings: {
            group: "Inventory",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/reports/material-distribution-note",
        name: "inventory/finishing-printing/reports/material-distribution-note",
        moduleId: "modules/inventory/finishing-printing/reports/material-distribution-note/index",
        nav: true,
        title: "Laporan Bon Pengantar Greige",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/fp-return-inv-to-purchasing",
        name: "inventory/finishing-printing/fp-return-inv-to-purchasing",
        moduleId: "modules/inventory/finishing-printing/fp-return-inv-to-purchasing/index",
        nav: true,
        title: "Bon Retur Barang - Pembelian",
        auth: true,
        settings: {
            group: "Inventory",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/receipt/fabric",
        name: "inventory/garment/leftover-warehouse/receipt/fabric",
        moduleId: "modules/inventory/garment-leftover-warehouse/receipt/fabric/index",
        nav: true,
        title: "Penerimaan Gudang Sisa - FABRIC",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/receipt/accessories",
        name: "inventory/garment/leftover-warehouse/receipt/accessories",
        moduleId: "modules/inventory/garment-leftover-warehouse/receipt/accessories/index",
        nav: true,
        title: "Penerimaan Gudang Sisa - ACCESSORIES",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/receipt/finished-good",
        name: "inventory/garment/leftover-warehouse/receipt/finished-good",
        moduleId: "modules/inventory/garment-leftover-warehouse/receipt/finished-good/index",
        nav: true,
        title: "Penerimaan Gudang Sisa - BARANG JADI",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/receipt/aval",
        name: "inventory/garment/leftover-warehouse/receipt/aval",
        moduleId: "modules/inventory/garment-leftover-warehouse/receipt/aval/index",
        nav: true,
        title: "Penerimaan Gudang Sisa - AVAL",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: 'inventory/reports/inventory-dystuff-report',
        name: 'inventory/reports/inventory-dystuff-report',
        moduleId: './modules/inventory/reports/inventory-dystuff-report/index',
        nav: true,
        title: 'Laporan Stock Gudang Dyeing Printing',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/expenditure/fabric",
        name: "inventory/garment/leftover-warehouse/expenditure/fabric",
        moduleId: "modules/inventory/garment-leftover-warehouse/expenditure/fabric/index",
        nav: true,
        title: "Pengeluaran Gudang Sisa - FABRIC",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/expenditure/accessories",
        name: "inventory/garment/leftover-warehouse/expenditure/accessories",
        moduleId: "modules/inventory/garment-leftover-warehouse/expenditure/accessories/index",
        nav: true,
        title: "Pengeluaran Gudang Sisa - ACCESSORIES",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/expenditure/finished-good",
        name: "inventory/garment/leftover-warehouse/expenditure/finished-good",
        moduleId: "modules/inventory/garment-leftover-warehouse/expenditure/finished-good/index",
        nav: true,
        title: "Pengeluaran Gudang Sisa - BARANG JADI",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/expenditure/aval",
        name: "inventory/garment/leftover-warehouse/expenditure/aval",
        moduleId: "modules/inventory/garment-leftover-warehouse/expenditure/aval/index",
        nav: true,
        title: "Pengeluaran Gudang Sisa - AVAL",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/master/comodity",
        name: "inventory/garment/leftover-warehouse/master/comodity",
        moduleId: "modules/inventory/garment-leftover-warehouse/master/comodity/index",
        nav: true,
        title: "Master Komoditi Gudang Sisa",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/master/buyer",
        name: "inventory/garment/leftover-warehouse/master/buyer",
        moduleId: "modules/inventory/garment-leftover-warehouse/master/garment-leftover-warehouse-buyer/index",
        nav: true,
        title: "Buyer Gudang Sisa Garment",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/report/receipt-monitoring",
        name: "inventory/garment/leftover-warehouse/report/receipt-monitoring",
        moduleId: "modules/inventory/garment-leftover-warehouse/receipt/report/fabric-accessories/index",
        nav: true,
        title: "Report Penerimaan Gudang Sisa Fabric dan Accessories",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/report/expenditure-finished-goods",
        name: "inventory/garment/leftover-warehouse/report/expenditure-finished-goods",
        moduleId: "modules/inventory/garment-leftover-warehouse/receipt/report/finished-good/index",
        nav: true,
        title: "Report Penerimaan Gudang Sisa - Barang Jadi",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/report/aval-receipt-monitoring",
        name: "inventory/garment/leftover-warehouse/report/aval-receipt-monitoring",
        moduleId: "modules/inventory/garment-leftover-warehouse/receipt/report/aval/index",
        nav: true,
        title: "Report Penerimaan Gudang Sisa Aval",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/reports/expenditure-leftover-report",
        name: "inventory/garment/leftover-warehouse/reports/expenditure-leftover-report",
        moduleId: "modules/inventory/garment-leftover-warehouse/reports/expenditure-leftover-report/index",
        nav: true,
        title: "Report Pengeluaran Gudang Sisa - Fabric dan Accessories",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/expenditure/report/finished-good",
        name: "inventory/garment/leftover-warehouse/expenditure/report/finished-good",
        moduleId: "modules/inventory/garment-leftover-warehouse/expenditure/report/finished-good/index",
        nav: true,
        title: "Report Pengeluaran Gudang Sisa - Barang Jadi",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/expenditure/report/aval",
        name: "inventory/garment/leftover-warehouse/expenditure/report/aval",
        moduleId: "modules/inventory/garment-leftover-warehouse/expenditure/report/aval/index",
        nav: true,
        title: "Report Pengeluaran Gudang Sisa - Aval",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/balance-stock/report/fabric",
        name: "inventory/garment/leftover-warehouse/balance-stock/report/fabric",
        moduleId: "modules/inventory/garment-leftover-warehouse/balance-stock/report/fabric/index",
        nav: true,
        title: "Report Stock Gudang Sisa - FABRIC",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/balance-stock/report/acc",
        name: "inventory/garment/leftover-warehouse/balance-stock/report/acc",
        moduleId: "modules/inventory/garment-leftover-warehouse/balance-stock/report/acc/index",
        nav: true,
        title: "Report Stock Gudang Sisa - ACCESSORIES",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/balance-stock/report/finished-good",
        name: "inventory/garment/leftover-warehouse/balance-stock/report/finished-good",
        moduleId: "modules/inventory/garment-leftover-warehouse/balance-stock/report/finished-good/index",
        nav: true,
        title: "Report Stock Gudang Sisa - Barang Jadi",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/balance-stock/report/aval",
        name: "inventory/garment/leftover-warehouse/balance-stock/report/aval",
        moduleId: "modules/inventory/garment-leftover-warehouse/balance-stock/report/aval/index",
        nav: true,
        title: "Report Stock Gudang Sisa - Aval",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/balance-stock",
        name: "inventory/garment/leftover-warehouse/balance-stock",
        moduleId: "modules/inventory/garment-leftover-warehouse/balance-stock/index",
        nav: true,
        title: "Balance Stok Gudang Sisa",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },


    {
        route: "inventory/garment/leftover-warehouse/balance-stock/reports/bookkeeping/recap-stock",
        name: "inventory/garment/leftover-warehouse/balance-stock/reports/bookkeeping/recap-stock",
        moduleId: "modules/inventory/garment-leftover-warehouse/reports/bookkeeping/recap-stock/index",
        nav: true,
        title: "Report Rekap Persediaan Gudang Sisa",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/reports/bookkeeping/flow-stock",
        name: "inventory/garment/leftover-warehouse/reports/bookkeeping/flow-stock",
        moduleId: "modules/inventory/garment-leftover-warehouse/reports/bookkeeping/flow-stock/index",
        nav: true,
        title: "Report FLow Persediaan Gudang Sisa",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/balance-stock/reports/bookkeeping/detail",
        name: "inventory/garment/leftover-warehouse/balance-stock/reports/bookkeeping/detail",
        moduleId: "modules/inventory/garment-leftover-warehouse/reports/bookkeeping/detail/index",
        nav: true,
        title: "Report Detail Persediaan Gudang Sisa",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "inventory/garment/leftover-warehouse/reports/bookkeeping/bookkeeping-stock",
        name: "inventory/garment/leftover-warehouse/reports/bookkeeping/bookkeeping-stock",
        moduleId: "modules/inventory/garment-leftover-warehouse/reports/bookkeeping/bookkeeping-stock/index",
        nav: true,
        title: "Report Stock Gudang Sisa",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { C9: 1, "PG": 1 },
            subGroup: "gudang sisa garment",
            iconClass: "fa fa-dashboard",
        },

    },
]