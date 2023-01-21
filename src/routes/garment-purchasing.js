module.exports = [
    {
        route: '/garment/etl/garment-purchase-requests',
        name: 'etl-garment-purchase-requests',
        moduleId: './modules/garment-purchasing/etl/garment-purchase-requests/index',
        nav: true,
        title: 'ETL Purchase Request',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: {  "C9" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment-generating-data',
        name: 'garment-generating-data',
        moduleId: './modules/garment-purchasing/garment-generating-data/index',
        nav: true,
        title: 'Garment Generating Data',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: {"C9" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/merchandiser/garment-purchase-request-master',
        name: 'purchase-request-master',
        moduleId: './modules/merchandiser/garment-purchase-request-master/index',
        nav: true,
        title: 'PR Master (Semua User)',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "PG": 1 },
            iconClass: 'fa fa-calculator',
            byUser: false
        }
    },
    {
        route: '/garment/pr',
        name: 'purchase-request',
        moduleId: './modules/garment-purchasing/purchase-request/index',
        nav: true,
        title: 'Purchase Request',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/pr/monitoring',
        name: 'purchase-request-monitoring',
        moduleId: './modules/garment-purchasing/monitoring-purchase-request/index',
        nav: true,
        title: 'Monitoring Purchase Request',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: { "PGA": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/pr/monitoring-purchase-request/all-unit',
        name: 'purchase-request-monitoring-all-unit',
        moduleId: './modules/garment-purchasing/monitoring-purchase-request-all-unit/index',
        nav: true,
        title: 'Monitoring Purchase Request Semua Unit',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: { "PGA": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }, {
        route: '/garment/po-internal',
        name: 'purchase-order-internal',
        moduleId: './modules/garment-purchasing/purchase-order-internal/index',
        nav: true,
        title: 'Purchase Order Internal',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "PG": 1, },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-purchase-order-internal',
        name: 'monitoring-purchase-order-internal',
        moduleId: './modules/garment-purchasing/monitoring-purchase-order-internal/index',
        nav: true,
        title: 'Laporan Purchase Order Internal',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: { "C9": 1, "PG": 1, },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/po-external',
        name: 'purchase-order-external',
        moduleId: './modules/garment-purchasing/purchase-order-external/index',
        nav: true,
        title: 'Purchase Order External',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "PG": 1, },
            conClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/po-external/all',
        name: 'purchase-order-external-kasie',
        moduleId: './modules/garment-purchasing/purchase-order-external-kasie/index',
        nav: true,
        title: 'Purchase Order External All',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "PG": 1 },
            conClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/po-external/over-budget',
        name: 'purchase-order-external-over-budget',
        moduleId: './modules/garment-purchasing/purchase-order-external-over-budget/index',
        nav: true,
        title: 'Purchase Order External Over Budget',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "C5": 1 },
            conClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/po-external/report/over-budget',
        name: 'monitoring-purchase-order-external-over-budget',
        moduleId: './modules/garment-purchasing/monitoring-purchase-order-external-over-budget/index',
        nav: true,
        title: 'Monitoring Purchase Order External Over Budget',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "C9": 1, "PG": 1, "C5": 1, "B9": 1 },
            conClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-purchase',
        name: 'monitoring-purchase',
        moduleId: './modules/garment-purchasing/monitoring-purchase-order/index',
        nav: true,
        title: 'Monitoring Purchase',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "C9": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-purchase-all-user',
        name: 'monitoring-purchase-all-user',
        moduleId: './modules/garment-purchasing/monitoring-purchase-order-all-user/index',
        nav: true,
        title: 'Monitoring Purchase All User',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "B7": 1, "C9": 1, "PG": 1, "B9": 1, "B1": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/delivery-order',
        name: 'delivery-order',
        moduleId: './modules/garment-purchasing/delivery-order/index',
        nav: true,
        title: 'Surat Jalan',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-delivery-order',
        name: 'monitoring-delivery-order',
        moduleId: './modules/garment-purchasing/monitoring-delivery-order/index',
        nav: true,
        title: 'Monitoring Surat Jalan',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: { "C9": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-delivery-order-all',
        name: 'monitoring-delivery-order-all',
        moduleId: './modules/garment-purchasing/monitoring-delivery-order-all/index',
        nav: true,
        title: 'Monitoring Surat Jalan',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/customs',
        name: 'customs',
        moduleId: './modules/garment-purchasing/customs/index',
        nav: true,
        title: 'Bea Cukai',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-customs',
        name: 'monitoring-customs',
        moduleId: './modules/garment-purchasing/monitoring-customs/index',
        nav: true,
        title: 'Monitoring Bea Cukai',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: { "C9": 1, "PG": 1, "C1B" : 1, "C1A" : 1, "C2C" : 1, "C2B" : 1, "C2A" : 1  },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/invoice-note',
        name: 'invoice-note',
        moduleId: './modules/garment-purchasing/invoice-note/index',
        nav: true,
        title: 'Invoice',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "APG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-invoice-note',
        name: 'monitoring-invoice-note',
        moduleId: './modules/garment-purchasing/monitoring-invoice-note/index',
        nav: true,
        title: 'Monitoring Invoice',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: { "C9": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/intern-note',
        name: 'intern-note',
        moduleId: './modules/garment-purchasing/intern-note/index',
        nav: true,
        title: 'Nota Intern',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "APG": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/intern-note-all',
        name: 'intern-note-all',
        moduleId: './modules/garment-purchasing/intern-note-all/index',
        nav: true,
        title: 'Nota Intern All',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "PG": 7 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-intern-note',
        name: 'monitoring-intern-note',
        moduleId: './modules/garment-purchasing/monitoring-intern-note-new/index',
        nav: true,
        title: 'Monitoring Nota Intern',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "C9": 1, "PG": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-intern-note-all',
        name: 'monitoring-intern-note-all',
        moduleId: './modules/garment-purchasing/monitoring-intern-note-all/index',
        nav: true,
        title: 'Monitoring Nota Intern All',
        auth: true,
        settings: {
            group: "g-purchasing",
            //            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/unit-receipt-note-by-user',
        name: 'unit-receipt-note',
        moduleId: './modules/garment-purchasing/unit-receipt-note-by-user/index',
        nav: true,
        title: 'Bon Terima Unit',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/unit-receipt-note-all',
        name: 'unit-receipt-note',
        moduleId: './modules/garment-purchasing/unit-receipt-note-all/index',
        nav: true,
        title: 'Bon Terima Unit (Semua User)',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment-receipt-correction-by-user',
        name: 'garment-receipt-correction-by-user',
        moduleId: './modules/garment-purchasing/garment-receipt-correction/index',
        nav: true,
        title: 'Koreksi Bon Terima Unit',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "PG": 1, },
            iconClass: 'fa fa-dashboard',
            byUser: true
        }
    },
    {
        route: 'garment-receipt-correction-all',
        name: 'garment-receipt-correction-all',
        moduleId: './modules/garment-purchasing/garment-receipt-correction/index',
        nav: true,
        title: 'Koreksi Bon Terima Unit (Semua User)',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "PG": 1, },
            iconClass: 'fa fa-dashboard',
            byUser: false
        }
    },
    {
        route: '/garment/unit-delivery-order-by-user',
        name: 'unit-receipt-note-by-user',
        moduleId: './modules/garment-purchasing/unit-delivery-order-by-user/index',
        nav: true,
        title: 'Unit Delivery Order',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/unit-delivery-order-all',
        name: 'unit-receipt-note-all',
        moduleId: './modules/garment-purchasing/unit-delivery-order-all/index',
        nav: true,
        title: 'Unit Delivery Order (Semua User)',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/unit-delivery-order-retur',
        name: 'unit-delivery-order-retur',
        moduleId: './modules/garment-purchasing/unit-delivery-order-retur/index',
        nav: true,
        title: 'DO Retur',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/unit-expenditure-note-by-user',
        name: 'unit-expenditure-note-by-user',
        moduleId: './modules/garment-purchasing/unit-expenditure-note-by-user/index',
        nav: true,
        title: 'Bon Pengeluaran Unit',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/unit-expenditure-note-all',
        name: 'unit-expenditure-note-all',
        moduleId: './modules/garment-purchasing/unit-expenditure-note-all/index',
        nav: true,
        title: 'Bon Pengeluaran Unit (Semua User)',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-unit-receipt-note',
        name: 'unit-receipt-note',
        moduleId: './modules/garment-purchasing/monitoring-unit-receipt-note/index',
        nav: true,
        title: 'Monitoring Bon Terima Unit',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: { "C9": 1, "C1B" : 1, "C1A" : 1, "C2C" : 1, "C2B" : 1, "C2A" : 1  },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-unit-receipt-note-all',
        name: 'unit-receipt-note',
        moduleId: './modules/garment-purchasing/monitoring-unit-receipt-note-all/index',
        nav: true,
        title: 'Monitoring Bon Terima Unit All',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "PG": 1, },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/purchase-quantity-correction',
        name: 'purchase-quantity-correction',
        moduleId: './modules/garment-purchasing/purchase-quantity-correction/index',
        nav: true,
        title: 'Koreksi Jumlah Pembelian',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "APG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-purchase-quantity-correction',
        name: 'purchase-quantity-correction',
        moduleId: './modules/garment-purchasing/monitoring-purchase-quantity-correction/index',
        nav: true,
        title: 'Monitoring Koreksi Jumlah Pembelian',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: { "C9": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/purchase-price-correction',
        name: 'purchase-price-correction',
        moduleId: './modules/garment-purchasing/purchase-price-correction/index',
        nav: true,
        title: 'Koreksi Harga Pembelian',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "APG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/purchase-return-correction-note',
        name: 'purchase-return-correction-note',
        moduleId: './modules/garment-purchasing/purchase-return-correction-note/index',
        nav: true,
        title: 'Nota Koreksi - Retur',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "APG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-purchase-price-correction',
        name: 'monitoring-purchase-price-correction',
        moduleId: './modules/garment-purchasing/monitoring-purchase-price-correction/index',
        nav: true,
        title: 'Monitoring Koreksi Harga Pembelian',
        auth: true,
        settings: {
            group: "g-purchasing",
            //permission: { "C9": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-kedatangan-barang',
        name: 'monitoring-kedatangan-barang',
        moduleId: './modules/garment-purchasing/monitoring-kedatangan-barang/index',
        nav: true,
        title: 'Monitoring Ketepatan Kedatangan Barang',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-pengiriman-barang',
        name: 'monitoring-pengiriman-barang',
        moduleId: './modules/garment-purchasing/monitoring-pengiriman-barang/index',
        nav: true,
        title: 'Monitoring Ketepatan Pengiriman Barang',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment/purchase-order-purchase-order-external-duration-report',
        name: 'garment/purchase-order-purchase-order-external-duration-report',
        moduleId: './modules/garment-purchasing/reports/duration-reports/purchase-order-purchase-order-external-duration-report/index',
        nav: true,
        title: 'Laporan Durasi PO Internal - PO Eksternal',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment/purchase-order-external-delivery-order-duration-report',
        name: 'garment/purchase-order-external-delivery-order-duration-report',
        moduleId: './modules/garment-purchasing/reports/duration-reports/purchase-order-external-delivery-order-duration-report/index',
        nav: true,
        title: 'Laporan Durasi PO Eksternal - Surat Jalan ',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment-purchase-order/reports/supplier',
        name: 'garment-purchase-order-reports-by-supplier',
        moduleId: './modules/garment-purchasing/reports/supplier-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Supplier',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment/po-master-distribution',
        name: 'garment-po-master-distribution',
        moduleId: './modules/garment-purchasing/po-master-distribution/index',
        nav: true,
        title: 'Pembagian PO Master',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-purchasing-disposition',
        name: 'garment-purchasing-disposition',
        moduleId: './modules/garment-purchasing/purchasing-disposition/index',
        nav: true,
        title: 'Disposisi Pembayaran',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "PG": 1, "APG": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-purchasing-disposition/all',
        name: 'garment-purchasing-disposition-all',
        moduleId: './modules/garment-purchasing/purchasing-disposition-all/index',
        nav: true,
        title: 'Disposisi Pembayaran (Semua User)',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "transaksi",
            permission: { "PG": 1, "APG": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment/monitoring-ro-job-order',
        name: 'garment-monitoring-ro-job-order',
        moduleId: './modules/garment-purchasing/monitoring-ro-job-order/index',
        nav: true,
        title: 'Monitoring RO Job Order',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "PG": 1, "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment/monitoring-ro-master',
        name: 'garment-monitoring-ro-master',
        moduleId: './modules/garment-purchasing/monitoring-ro-master/index',
        nav: true,
        title: 'Monitoring RO Master',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "PG": 1, "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment/reports/garment-disposition-purchase-report',
        name: 'garment-disposition-purchase-report',
        moduleId: './modules/garment-purchasing/reports/garment-disposition-purchase-report/index',
        nav: true,
        title: 'Laporan Disposisi Pembayaran',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment-purchase-order/reports/topten-supplier',
        name: 'garment-purchase-order-reports-topten-supplier',
        moduleId: './modules/garment-purchasing/reports/topten-supplier-report/index',
        nav: true,
        title: 'Laporan Top Ten Supplier',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/pr-master-garment-validation-report',
        name: 'pr-master-garment-validation-report',
        moduleId: './modules/merchandiser/report/pr-master-garment-validation-report/index',
        nav: true,
        title: 'Monitoring Validasi PR Master',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "PG": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/cost-calculation-garment-approval-report',
        name: 'cost-calculation-garment-approval-report',
        moduleId: './modules/merchandiser/report/cost-calculation-garment-approval-report/index',
        nav: true,
        title: 'Monitoring Validasi Cost Calculation Garment',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "PG": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/accounting/reports/flow-penerimaan',
        name: 'flow-penerimaan',
        moduleId: './modules/accounting/reports/flow-penerimaan/index',
        nav: true,
        title: 'Laporan Rekap Bon Terima Unit (BUM)',
        auth: true,
        settings: {
            group: "g-purchasing",
            // permission: { "B1": 1, "C9": 1, "C1B":1, "C1A":1, "C2C":1,"C2B":1,"C2A":1 },
            iconClass: 'fa fa-clone'
        }
    },
    {
        route: 'garment-central-bill-reception/reports',
        name: 'garment-central-bill-reception-report',
        moduleId: './modules/accounting/reports/central-bill-reception-report/index',
        nav: true,
        title: 'Laporan Data Penerimaan Bon Pusat',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "B1": 1, "C9": 1 },
            iconClass: 'fa fa-clone'
        }
    },
    {
        route: 'garment-central-bill-expenditure/reports',
        name: 'garment-central-bill-expenditure-report',
        moduleId: './modules/accounting/reports/central-bill-expenditure-report/index',
        nav: true,
        title: 'Laporan Data Pengeluaran Bon Pusat',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "B1": 1, "C9": 1 },
            iconClass: 'fa fa-clone'
        }
    },
    {
        route: 'garment-correction-note-reception/reports',
        name: 'garment-correction-note-reception-report',
        moduleId: './modules/accounting/reports/correction-note-reception-report/index',
        nav: true,
        title: 'Laporan Data Penerimaan Nota Koreksi',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "B1": 1, "C9": 1 },
            iconClass: 'fa fa-clone'
        }
    },
    {
        route: 'garment-correction-note-expenditure/reports',
        name: 'garment-correction-note-expenditure-report',
        moduleId: './modules/accounting/reports/correction-note-expenditure-report/index',
        nav: true,
        title: 'Laporan Data Pengeluaran Nota Koreksi',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "B1": 1, "C9": 1 },
            iconClass: 'fa fa-clone'
        }
    },
    {
        route: 'garment-daily-purchase-order/reports',
        name: 'garment-daily-purchase-order-report',
        moduleId: './modules/accounting/reports/garment-daily-purchase-report/index',
        nav: true,
        title: 'Laporan Buku Harian Pembelian | Garment',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "B1": 1, "C9": 1 },
            iconClass: 'fa fa-clone'
        }
    },
    {
        route: 'garment-purchase-order/purchase-book-report',
        name: 'garment-purchasing-book-report',
        moduleId: './modules/garment-purchasing/purchase-book-report/index',
        nav: true,
        title: 'Laporan Buku Pembelian Bahan Baku, Embalace, Umum',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            //            permission: {"B1": 1, "C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'accounting/accounting-stock-report',
        name: 'accounting-stock-report',
        moduleId: './modules/accounting/reports/accounting-stock-report/index',
        nav: true,
        title: 'Laporan Stok Pembukuan',
        auth: true,
        settings: {
            group: "g-purchasing",
            //   permission: {"B1": 1, "C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    // {
    //   route: 'garment-purchase-order/purchase-book-report',
    //   name: 'garment-purchasing-book-report',
    //   moduleId: './modules/garment-purchasing/purchase-book-report/index',
    //   nav: true,
    //   title: 'Laporan Buku Pembelian',
    //   auth: true,
    //   settings: {
    //       group: "g-purchasing",
    //       permission: {"C9": 1, "PG": 1, "B9": 1, "B1": 1},
    //       iconClass: 'fa fa-dashboard'
    //   }
    // }
    {
        route: 'garment-purchase-order/garment-intern-note-payment-status-report',
        name: 'garment-intern-note-payment-status-report',
        moduleId: './modules/garment-purchasing/reports/garment-intern-note-payment-status-report/index',
        nav: true,
        title: 'Laporan Status Bayar Nota Intern',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment-receipt-correction-report',
        name: 'garment-receipt-correction-report',
        moduleId: './modules/garment-purchasing/garment-receipt-correction-report/index',
        nav: true,
        title: 'Laporan Koreksi Penerimaan',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment-flow-detail-material/reports',
        name: 'garment-flow-detail-material-report',
        moduleId: './modules/accounting/reports/garment-flow-detail-material-report/index',
        nav: true,
        title: 'Laporan Rekap Bon Keluar Unit (BUK)',
        auth: true,
        settings: {
            group: "g-purchasing",
            // permission: {"C9": 1, "PG": 1, "B9": 1, "B1": 1, "C1B":1, "C1A":1, "C2C":1,"C2B":1,"C2A":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment-purchase-book-report',
        name: 'garment-purchase-book-report',
        moduleId: './modules/garment-purchasing/garment-purchase-book-report/index',
        nav: true,
        title: 'Laporan Buku Harian Pembelian Term Of Payment',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment-stock-report',
        name: 'garment-stock-report',
        moduleId: './modules/garment-purchasing/reports/garment-stock-report/index',
        nav: true,
        title: 'Laporan Stock Gudang',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'debt-book-report',
        name: 'debt-book-report',
        moduleId: './modules/accounting/reports/debt-book-report/index',
        nav: true,
        title: 'Detail Rekap Saldo Hutang',
        auth: true,
        settings: {
            group: "g-purchasing",
            //   permission: { "B1": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment-cmt-report',
        name: 'garment-cmt-report',
        moduleId: './modules/garment-purchasing/reports/garment-realization-cmt-report/index',

        nav: true,
        title: 'Laporan Realisasi CMT',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'garment-debt-balance-report',
        name: 'garment-debt-balance-report',
        moduleId: './modules/accounting/reports/debt-balance-report/index',
        nav: true,
        title: 'Laporan Saldo Hutang',
        auth: true,
        settings: {
            group: "g-purchasing",
            // permission: {"C9": 1, "B1": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'debt-card-report',
        name: 'debt-card-report',
        moduleId: './modules/accounting/reports/debt-card-report/index',
        nav: true,
        title: 'Laporan Kartu Hutang',
        auth: true,
        settings: {
            group: "g-purchasing",
            //   permission: { "B1": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/ro-feature',
        name: 'ro-feature',
        moduleId: './modules/garment-purchasing/ro-feature/index',
        nav: true,
        title: 'Fitur Pencarian RO',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "fitur",
            permission: { "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/laporan/laporan-flow-penerimaan',
        name: 'laporan-flow-pengeluaran',
        moduleId: './modules/garment-purchasing/reports/garment-unit-flow-penerimaan-report/index',
        nav: true,
        title: 'Laporan Flow Penerimaan',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "C9": 1, "GU": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/laporan/laporan-flow-pengeluaran',
        name: 'laporan-flow-pengeluaran',
        moduleId: './modules/garment-purchasing/reports/garment-unit-flow-detail-material-report/index',
        nav: true,
        title: 'Laporan Flow Pengeluaran',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "laporan",
            permission: { "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "C9": 1, "GU": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    // {
    //     route: '/garment-purchasing-disposition',
    //     name: 'garment-purchasing-disposition',
    //     moduleId: './modules/garment-purchasing/purchasing-disposition/index',
    //     nav: true,
    //     title: 'Disposisi Pembayaran',
    //     auth: true,
    //     settings: {
    //         group: "g-purchasing",
    //         permission: { "PG": 1, "APG": 1, "C9": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    // },
    {
        route: '/garment-closing-date',
        name: 'garment-closing-date',
        moduleId: './modules/garment-purchasing/garment-closing-date/index',
        nav: true,
        title: 'Closing Date',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'monitoring-flow-product',
        name: 'monitoring-flow-product',
        moduleId: './modules/garment-purchasing/reports/monitoring-flow-product/index',
        nav: true,
        title: 'History Barang Masuk',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "monitoring",
            permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/bcno-feature',
        name: 'bcno-feature',
        moduleId: './modules/garment-purchasing/bcno-feature/index',
        nav: true,
        title: 'Fitur Cek No BC',
        auth: true,
        settings: {
            group: "g-purchasing",
            subGroup: "fitur",
            permission: { "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]