module.exports = [
    {
        route: 'pr',
        name: 'purchase-request',
        moduleId: './modules/purchasing/purchase-request/index',
        nav: true,
        title: 'Purchase Request',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1, "B7": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'pr/monitoring',
        name: 'purchase-request-monitoring',
        moduleId: './modules/purchasing/monitoring-purchase-request/index',
        nav: true,
        title: 'Monitoring Purchase Request',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1, "B7": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'monitoring-purchase-request-all-unit',
        name: 'monitoring-purchase-request-all-unit',
        moduleId: './modules/purchasing/monitoring-purchase-request-all-unit/index',
        nav: true,
        title: 'Monitoring Purchase Request Semua Unit',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C5": 1, "C9": 1, "B1": 1, "B4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po',
        name: 'purchase-order',
        moduleId: './modules/purchasing/purchase-order/index',
        nav: true,
        title: 'Purchase Order',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-order-internal/monitoring',
        name: 'po-internal-belum-unit-payment-order-monitoring',
        moduleId: './modules/purchasing/monitoring-po-internal-belum-po-external/index',
        nav: true,
        title: 'Monitoring Purchase Order Internal Belum Diproses Pembelian',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po-internal/monitoring',
        name: 'purchase-order-internal-monitoring',
        moduleId: './modules/purchasing/monitoring-purchase-order-internal/index',
        nav: true,
        title: 'Monitoring Purchase Order Internal',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'receipt-spb-monitoring',
        name: 'receipt-spb-monitoring',
        moduleId: './modules/purchasing/unit-before-spb-monitoring/index',
        nav: true,
        title: 'Monitoring Bon Belum Buat SPB',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po-external',
        name: 'purchase-order-external',
        moduleId: './modules/purchasing/purchase-order-external/index',
        nav: true,
        title: 'Purchase Order External',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    // {
    //     route: 'vb-expedition-realitation-report',
    //     name: 'vb-expedition-realitation-report',
    //     moduleId: './modules/purchasing/reports/vb-expedition-realitation-report/index',
    //     nav: true,
    //     title: 'Laporan Ekspedisi Realisasi VB',
    //     auth: true,
    //     settings: {
    //         group: "purchasing",
    //         permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "B4": 1, "C5": 1, "C9": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    // },
    {
        route: 'po-external/all',
        name: 'purchase-order-external-kasei',
        moduleId: './modules/purchasing/purchase-order-external-kasei/index',
        nav: true,
        title: 'Purchase Order External All',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "PI": 7, "PG": 7, "PK": 7, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/monitoring/all',
        name: 'purchase-order-monitoring',
        moduleId: './modules/purchasing/monitoring-purchase-order-all-user/index',
        nav: true,
        title: 'Monitoring Purchase All',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "PI": 7, "PG": 7, "PK": 7, "C9": 1, "B1": 1, "B4": 1, "C5": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/monitoring',
        name: 'purchase-order-monitoring',
        moduleId: './modules/purchasing/monitoring-purchase-order/index',
        nav: true,
        title: 'Monitoring Purchase',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/unit',
        name: 'purchase-order-reports-periode-unit',
        moduleId: './modules/purchasing/reports/purchase-order-report/unit-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Unit',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1, "C5": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/category',
        name: 'purchase-order-reports-periode-category',
        moduleId: './modules/purchasing/reports/purchase-order-report/category-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Kategori',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1, "C5": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/unit-category',
        name: 'purchase-order-reports-periode-unit-category',
        moduleId: './modules/purchasing/reports/purchase-order-report/unit-category-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Unit per Kategori',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1, "C5": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/supplier',
        name: 'purchase-order-reports-periode-supplier',
        moduleId: './modules/purchasing/reports/purchase-order-report/supplier-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Supplier',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1, "C5": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'delivery-order',
        name: 'delivery-order',
        moduleId: './modules/purchasing/delivery-order/index',
        nav: true,
        title: 'Surat Jalan',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'do/monitoring',
        name: 'delivery-order-monitoring',
        moduleId: './modules/purchasing/monitoring-delivery-order/index',
        nav: true,
        title: 'Monitoring Surat Jalan',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'receipt-note/unit',
        name: 'receipt-note-unit',
        moduleId: './modules/purchasing/unit-receipt-note/index',
        nav: true,
        title: 'Bon Terima Unit',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1, "B7": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'receipt-note/unit/monitoring',
        name: 'receipt-note-unit-monitoring',
        moduleId: './modules/purchasing/unit-receipt-note-monitoring/index',
        nav: true,
        title: 'Monitoring Bon Terima Unit',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1, "B7": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'report/bon-unit-blm-spb',
        name: 'bon-unit-blm-spb',
        moduleId: './modules/purchasing/reports/bon-unit-blm-spb/index',
        nav: true,
        title: 'Laporan Bon Terima Unit Belum Dibuat SPB',
        auth: true,
        settings: {
            group: "purchasing",
            //permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-order',
        name: 'unit-payment-order',
        moduleId: './modules/purchasing/unit-payment-order/index',
        nav: true,
        title: 'Surat Perintah Bayar',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-order/all',
        name: 'unit-payment-order-all',
        moduleId: './modules/purchasing/unit-payment-order-all/index',
        nav: true,
        title: 'Surat Perintah Bayar All',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "PI": 7, "PG": 7, "PK": 7, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/monitoring/spb',
        name: 'surat-perintah-bayar-monitoring',
        moduleId: './modules/purchasing/monitoring-surat-perintah-bayar-new/index',
        nav: true,
        title: 'Monitoring Surat Perintah Bayar',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/monitoring/tax',
        name: 'incometax-vat-monitoring',
        moduleId: './modules/purchasing/monitoring-ppn-pph/index',
        nav: true,
        title: 'Monitoring PPN & PPH',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-note/price-correction',
        name: 'unit-payment-price-correction-note',
        moduleId: './modules/purchasing/unit-payment-price-correction-note/index',
        nav: true,
        title: 'Koreksi Harga Pembelian',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-note/price-correction/monitoring',
        name: 'unit-payment-price-correction-note-monitoring',
        moduleId: './modules/purchasing/koreksi-harga/index',
        nav: true,
        title: 'Monitoring Koreksi Harga',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-note/quantity-correction',
        name: 'unit-payment-quantity-correction-note',
        moduleId: './modules/purchasing/unit-payment-quantity-correction-note/index',
        nav: true,
        title: 'Koreksi Jumlah Pembelian',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'correction-quantity',
        name: 'unit-payment-quantity-koreksi',
        moduleId: './modules/purchasing/koreksi-jumlah/index',
        nav: true,
        title: 'Monitoring Koreksi Jumlah',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'generating-data',
        name: 'generating-data',
        moduleId: './modules/purchasing/generating-data/index',
        nav: true,
        title: 'Generating Data',
        auth: true,
        settings: {
            group: "purchasing",            
            permission: { "C9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-request-purchase-order-duration-report',
        name: 'purchase-request-purchase-order-duration-report',
        moduleId: './modules/purchasing/reports/duration-reports/purchase-request-purchase-order-duration-report/index',
        nav: true,
        title: 'Laporan Durasi PR - PO Internal',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-request-purchase-order-external-duration-report',
        name: 'purchase-request-purchase-order-external-duration-report',
        moduleId: './modules/purchasing/reports/duration-reports/purchase-request-purchase-order-external-duration-report/index',
        nav: true,
        title: 'Laporan Durasi PR - PO Eksternal',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-order-purchase-order-external-duration-report',
        name: 'purchase-order-purchase-order-external-duration-report',
        moduleId: './modules/purchasing/reports/duration-reports/purchase-order-purchase-order-external-duration-report/index',
        nav: true,
        title: 'Laporan Durasi PO Internal - PO Eksternal',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-order-external-delivery-order-duration-report',
        name: 'purchase-order-external-delivery-order-duration-report',
        moduleId: './modules/purchasing/reports/duration-reports/purchase-order-external-delivery-order-duration-report/index',
        nav: true,
        title: 'Laporan Durasi PO Eksternal - Surat Jalan',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-order/monitoring-price',
        name: 'purchase-order-monitoring-price',
        moduleId: './modules/purchasing/monitoring-price/index',
        nav: true,
        title: 'Monitoring Price',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "W1": 1, "W2": 1, "B1": 1, "C5": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/ketepatan/staff',
        name: 'purchase-order-reports-ketepatan-staff',
        moduleId: './modules/purchasing/reports/purchase-order-report/staff-report-new/index',
        nav: true,
        title: 'Laporan Ketepatan kedatangan Barang per Staff',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'report/local-purchasing-book-report',
        name: 'local-purchasing-book-report',
        moduleId: './modules/purchasing/reports/local-purchasing-book-report/index',
        nav: true,
        title: 'Laporan Buku Pembelian Lokal',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'report/local-valas-purchasing-book-report',
        name: 'local-valas-purchasing-book-report',
        moduleId: './modules/purchasing/reports/local-valas-purchasing-book-report/index',
        nav: true,
        title: 'Laporan Buku Pembelian Lokal Valas',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'report/import-purchasing-book',
        name: 'import-purchasing-book-report',
        moduleId: './modules/purchasing/reports/import-purchasing-book/index',
        nav: true,
        title: 'Laporan Buku Pembelian Import',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-order-not-verified-report',
        name: 'unit-payment-order-not-verified-report',
        moduleId: './modules/purchasing/reports/unit-payment-order-not-verified-report/index',
        nav: true,
        title: 'Laporan SPB Not Verified',
        auth: true,
        settings: {
            group: "purchasing",
            //permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchasing-disposition',
        name: 'purchasing-disposition',
        moduleId: './modules/purchasing/purchasing-disposition/index',
        nav: true,
        title: 'Disposisi Pembayaran',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/expedition/reports/unit-payment-order-paid-status-report',
        name: 'unit-payment-order-paid-status',
        moduleId: './modules/expedition/reports/unit-payment-order-paid-status-report/index',
        nav: true,
        title: 'Laporan Status Bayar SPB',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "B4": 1, "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]
