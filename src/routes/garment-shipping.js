module.exports = [         
    {
        route: "master/garment-shipping-staff",
        name: "garment-shipping-staff",
        moduleId: "modules/master/garment-shipping-staff/index",
        nav: true,
        title: "Staff Shipping",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-fabric-type",
        name: "garment-fabric-type",
        moduleId: "modules/master/garment-fabric-type/index",
        nav: true,
        title: "Jenis Fabric",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-emkl",
        name: "garment-emkl",
        moduleId: "modules/master/garment-emkl/index",
        nav: true,
        title: "EMKL Dan Trucking Partner",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-ware-house",
        name: "garment-ware-house",
        moduleId: "modules/master/garment-ware-house/index",
        nav: true,
        title: "Pergudangan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-forwarder",
        name: "garment-forwarder",
        moduleId: "modules/master/garment-forwarder/index",
        nav: true,
        title: "Forwarder",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-courier",
        name: "garment-courier",
        moduleId: "modules/master/garment-courier/index",
        nav: true,
        title: "Courier",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-insurance",
        name: "garment-insurance",
        moduleId: "modules/master/garment-insurance/index",
        nav: true,
        title: "Insurance",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-transaction-type",
        name: "garment-transaction-type",
        moduleId: "modules/master/garment-transaction-type/index",
        nav: true,
        title: "Jenis Transaksi Penjualan Lokal",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-leftover-warehouse-product",
        name: "garment-leftover-warehouse-product",
        moduleId: "modules/master/garment-leftover-warehouse-product/index",
        nav: true,
        title: "Barang Gudang Sisa",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-leftover-warehouse-buyer",
        name: "garment-leftover-warehouse-buyer",
        moduleId: "modules/inventory/garment-leftover-warehouse/master/garment-leftover-warehouse-buyer/index",        
        nav: true,
        title: "Buyer Gudang Sisa Garment",
        auth: true,
        settings: {
          group: "g-shipping",
          subGroup: "master",
          permission: { "C9": 1, "SG": 1 },
          iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "master/garment-additional-charges",
        name: "garment-additional-charges",
        moduleId: "modules/master/garment-additional-charges/index",
        nav: true,
        title: "Additional Charges",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
        {
        route: "garment-detail-currencies",
        name: "garment-detail-currencies",
        moduleId: "./modules/master/garment-detail-currency/index",
        nav: true,
        title: "Rate Mingguan - USD",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "master",
            permission: { "C9": 1, "SG": 1, "B12": 1 },
        iconClass: "fa fa-dashboard",
    },
  },
    {
        route: '/merchandiser/garment-sales-contract',
        name: 'garment-sales-contract',
        moduleId: './modules/merchandiser/garment-sales-contract/index',
        nav: true,
        title: 'Sales Contract Per RO (Semua User)',
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: 'fa fa-calculator',
            byUser: false
        }
    },
    {
        route: "garment-shipping/packing-list",
        name: "garment-shipping/packing-list",
        moduleId: "modules/garment-shipping/packing-list/index",
        nav: true,
        title: "Packing List",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/packing-list",
        name: "garment-shipping/monitoring/packing-list",
        moduleId: "modules/garment-shipping/monitoring/packing-list/index",
        nav: true,
        title: "Monitoring Packing List",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "FP": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },  
    {
        route: "garment-shipping/invoice",
        name: "garment-shipping/invoice",
        moduleId: "modules/garment-shipping/invoice/index",
        nav: true,
        title: "Invoice Export Garment",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/invoice-all-user",
        name: "garment-shipping/invoice-all-user",
        moduleId: "modules/garment-shipping/invoice-all-user/index",
        nav: true,
        title: "Invoice Export Garment - (All User)",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1, "B1": 1, "PGA": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/generate-date",
        name: "garment-shipping/generate-date",
        moduleId: "modules/garment-shipping/monitoring/garment-shipping-generate-data/index",
        nav: true,
        title: "Generate Data",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/invoice",
        name: "garment-shipping/monitoring/invoice",
        moduleId: "modules/garment-shipping/monitoring/garment-invoice/index",
        nav: true,
        title: "Monitoring Invoice Export Garment",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },

    
    {
        route: "garment-shipping/cover-letter",
        name: "garment-shipping/cover-letter",
        moduleId: "modules/garment-shipping/cover-letter/index",
        nav: true,
        title: "Surat Pengantar",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/cover-letter",
        name: "garment-shipping/monitoring/cover-letter",
        moduleId: "modules/garment-shipping/monitoring/garment-cover-letter/index",
        nav: true,
        title: "Monitoring Surat Pengantar",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/shipping-instruction",
        name: "garment-shipping/shipping-instruction",
        moduleId: "modules/garment-shipping/shipping-instruction/index",
        nav: true,
        title: "Shipping Instruction",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/shipping-instruction",
        name: "garment-shipping/monitoring/shipping-instruction",
        moduleId: "modules/garment-shipping/monitoring/garment-shipping-instruction/index",
        nav: true,
        title: "Monitoring Shipping Instruction",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    }, 
    {
        route: "garment-shipping/export-sales-do",
        name: "garment-shipping/export-sales-do",
        moduleId: "modules/garment-shipping/export-sales-do/index",
        nav: true,
        title: "DO Penjualan Export",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/letter-of-credit",
        name: "garment-shipping/letter-of-credit",
        moduleId: "modules/garment-shipping/letter-of-credit/index",
        nav: true,
        title: "Letter Of Credit",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/garment-letter-of-credit",
        name: "garment-shipping/monitoring/garment-letter-of-credit",
        moduleId: "modules/garment-shipping/monitoring/garment-letter-of-credit/index",
        nav: true,
        title: "Monitoring Letter Of Credit",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/amend-letter-of-credit",
        name: "garment-shipping/amend-letter-of-credit",
        moduleId: "modules/garment-shipping/amend-letter-of-credit/index",
        nav: true,
        title: "Amend Letter Of Credit",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/credit-advice",
        name: "garment-shipping/credit-advice",
        moduleId: "modules/garment-shipping/credit-advice/index",
        nav: true,
        title: "Credit Advice",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/garment-credit-advice",
        name: "garment-shipping/monitoring/garment-credit-advice",
        moduleId: "modules/garment-shipping/monitoring/garment-credit-advice/index",
        nav: true,
        title: "Monitoring Credit Advice",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/vb-payment",
        name: "garment-shipping/vb-payment",
        moduleId: "modules/garment-shipping/vb-payment/index",
        nav: true,
        title: "Pembayaran VB",
        auth: true,
        settings: {
            group: "g-shipping",
            // permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },    
    {
        route: "garment-shipping/monitoring/shipment-garment",
        name: "garment-shipping/monitoring/shipment-garment",
        moduleId: "modules/garment-shipping/monitoring/garment-shipment/index",
        nav: true,
        title: "Monitoring Shipment Garment",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/invoice-history",
        name: "garment-shipping/monitoring/invoice-history",
        moduleId: "modules/garment-shipping/monitoring/garment-invoice-history/index",
        nav: true,
        title: "Monitoring Invoice History Garment",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-unit",
        name: "garment-shipping/monitoring/omzet-by-unit",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthy-by-unit/index",
        nav: true,
        title: "Report Omzet Garment Per Unit / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            // permission: { "C9": 1, "SG": 1, "PGA": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/report/detail-omzet-by-unit",
        name: "garment-shipping/report/detail-omzet-by-unit",
        moduleId: "modules/garment-shipping/monitoring/garment-detail-omzet-by-unit/index",
        nav: true,
        title: "Report Omzet Garment Per Unit / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-buyer-agent",
        name: "garment-shipping/monitoring/omzet-by-buyer-agent",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthly-by-buyer/index",
        nav: true,
        title: "Report Omzet Garment Per Buyer Agent / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1, "PGA": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
        {
        route: "garment-shipping/monitoring/omzet-by-buyer-brand",
        name: "garment-shipping/monitoring/omzet-by-buyer-brand",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthly-by-brand/index",
        nav: true,
        title: "Report Omzet Garment Per Buyer Brand / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1, "PGA": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-setion",
        name: "garment-shipping/monitoring/omzet-by-section",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthly-by-section/index",
        nav: true,
        title: "Report Omzet Garment Per Seksi / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1, "PGA": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-marketing",
        name: "garment-shipping/monitoring/omzet-by-marketing",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthly-by-marketing/index",
        nav: true,
        title: "Report Omzet Garment Per Marketing / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1, "PGA": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-country",
        name: "garment-shipping/monitoring/omzet-by-country",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthly-by-country/index",
        nav: true,
        title: "Report Omzet Garment Per Negara / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1, "PGA": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-comodity",
        name: "garment-shipping/monitoring/omzet-by-comodity",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthly-by-comodity/index",
        nav: true,
        title: "Report Omzet Garment Per Komoditi / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1, "PGA": 1 },
            iconClass: "fa fa-dashboard"
        }
    },      
    {
        route: "garment-shipping/credit-note",
        name: "garment-shipping/credit-note",
        moduleId: "modules/garment-shipping/credit-note/index",
        nav: true,
        title: "Credit Note",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/credit-note",
        name: "garment-shipping/monitoring/credit-note",
        moduleId: "modules/garment-shipping/monitoring/garment-credit-note/index",
        nav: true,
        title: "Monitoring Credit Note",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/debit-note",
        name: "garment-shipping/debit-note",
        moduleId: "modules/garment-shipping/debit-note/index",
        nav: true,
        title: "Debit Note",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
     {
        route: "garment-shipping/monitoring/debit-note",
        name: "garment-shipping/monitoring/debit-note",
        moduleId: "modules/garment-shipping/monitoring/garment-debit-note/index",
        nav: true,
        title: "Monitoring Debit Note",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },   
    {
        route: "garment-shipping/local-sales-contract",
        name: "garment-shipping/local-sales-contract",
        moduleId: "modules/garment-shipping/local-sales-contract/index",
        nav: true,
        title: "Sales Contract (Lokal)",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "penjualan lokal",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-sales-note",
        name: "garment-shipping/local-sales-note",
        moduleId: "modules/garment-shipping/local-sales-note/index",
        nav: true,
        title: "Nota Penjualan (Lokal)",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "penjualan lokal",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-sales-do",
        name: "garment-shipping/local-sales-do",
        moduleId: "modules/garment-shipping/local-sales-do/index",
        nav: true,
        title: "DO Penjualan Lokal",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "penjualan lokal",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-cover-letter",
        name: "garment-shipping/local-cover-letter",
        moduleId: "modules/garment-shipping/local-cover-letter/index",
        nav: true,
        title: "Surat Pengantar (Lokal)",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "penjualan lokal",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },  
    {
        route: "garment-shipping/local-price-correction-note",
        name: "garment-shipping/local-price-correction-note",
        moduleId: "modules/garment-shipping/local-price-correction-note/index",
        nav: true,
        title: "Nota Koreksi Harga",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "penjualan lokal",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-return-note",
        name: "garment-shipping/local-return-note",
        moduleId: "modules/garment-shipping/local-return-note/index",
        nav: true,
        title: "Nota Retur",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "penjualan lokal",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-price-cutting-note",
        name: "garment-shipping/local-price-cutting-note",
        moduleId: "modules/garment-shipping/local-price-cutting-note/index",
        nav: true,
        title: "Nota Potongan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "penjualan lokal",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/local-sales-report",
        name: "garment-shipping/monitoring/local-sales-report",
        moduleId: "modules/garment-shipping/monitoring/garment-local-sales-report-by-buyer/index",
        nav: true,
        title: "Monitoring Nota Penjualan Lokal",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-local-sales",
        name: "garment-shipping/monitoring/omzet-local-sales",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-local-sales/index",
        nav: true,
        title: "Monitoring Omzet Penjualan Lokal",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1, "B1": 1 },
            iconClass: "fa fa-dashboard"
        }
    }, 
    {
        route: "garment-shipping/monitoring/omzet-local-sales-unpaid",
        name: "garment-shipping/monitoring/omzet-local-sales-unpaid",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-local-sales-unpaid/index",
        nav: true,
        title: "Monitoring Omzet Penjualan Lokal Tidak Dibayar",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1, "B1": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-local-sales-unpaid",
        name: "garment-shipping/monitoring/omzet-local-sales-unpaid",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-local-sales-unpaid/index",
        nav: true,
        title: "Monitoring Omzet Penjualan Lokal Tidak Dibayar",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 ,"B1": 1 },
            iconClass: "fa fa-dashboard"
        }
    },  
    {
        route: "garment-shipping/monitoring/local-sales-book",
        name: "garment-shipping/monitoring/local-sales-book",
        moduleId: "modules/garment-shipping/monitoring/garment-local-sales-book/index",
        nav: true,
        title: "Report Buku Penjualan Lokal",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    }, 
    {
        route: "garment-shipping/report/detail-omzet-by-unit",
        name: "garment-shipping/report/detail-omzet-by-unit",
        moduleId: "modules/garment-shipping/monitoring/garment-detail-omzet-by-unit/index",
        nav: true,
        title: "Report Detail Omzet Garment Per Unit / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            // permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },    
    {
        route: "garment-shipping/monitoring/garment-recap-omzet",
        name: "garment-shipping/monitoring/garment-recap-omzet",
        moduleId: "modules/garment-shipping/monitoring/garment-recap-omzet-report/index",
        nav: true,
        title: "Report Buku Penjualan Export Garment / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },    
    {
        route: "garment-shipping/monitoring/omzet-year-buyer",
        name: "garment-shipping/monitoring/omzet-year-buyer",
        moduleId: "modules/garment-shipping/monitoring/omzet-year-buyer/index",
        nav: true,
        title: "Report Omzet Per Tahun Per Buyer",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-year-unit",
        name: "garment-shipping/monitoring/omzet-year-unit",
        moduleId: "modules/garment-shipping/monitoring/omzet-year-unit/index",
        nav: true,
        title: "Report Omzet Per Tahun Per Unit",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            // permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-year-unit",
        name: "garment-shipping/monitoring/omzet-year-unit",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-annual-unit/index",
        nav: true,
        title: "Report Omzet Per Tahun Per Unit",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-year-section",
        name: "garment-shipping/monitoring/omzet-year-section",
        moduleId: "modules/garment-shipping/monitoring/omzet-year-section/index",
        nav: true,
        title: "Report Omzet Per Tahun Per Section",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-year-marketing",
        name: "garment-shipping/monitoring/omzet-year-marketing",
        moduleId: "modules/garment-shipping/monitoring/omzet-year-marketing/index",
        nav: true,
        title: "Report Omzet Per Tahun Per Marketing",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },   
    {
        route: "garment-shipping/monitoring/omzet-year-country",
        name: "garment-shipping/monitoring/omzet-year-country",
        moduleId: "modules/garment-shipping/monitoring/omzet-year-country/index",
        nav: true,
        title: "Report Omzet Per Tahun Per Negara",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-year-buyer-comodity",
        name: "garment-shipping/monitoring/omzet-year-buyer-comodity",
        moduleId: "modules/garment-shipping/monitoring/omzet-year-buyer-comodity/index",
        nav: true,
        title: "Report Omzet Per Tahun Per Buyer Per Komoditi",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },

    {
        route: "garment-shipping/monitoring/cmt-sales",
        name: "garment-shipping/monitoring/cmt-sales",
        moduleId: "modules/garment-shipping/monitoring/garment-cmt-sales/index",
        nav: true,
        title: "Report Realisasi CMT Penjualan",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "laporan",
            permission: { "A3":1, "B1:":1, "B12":1,  "C9": 1, "C11": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/insurance-disposition",
        name: "garment-shipping/insurance-disposition",
        moduleId: "modules/garment-shipping/insurance-disposition/index",
        nav: true,
        title: "Lampiran Disposisi Pembayaran Polis Asuransi ",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/insurance-disposition",
        name: "garment-shipping/monitoing/insurance-disposition",
        moduleId: "modules/garment-shipping/monitoring/garment-insurance-disposition-report/index",
        nav: true,
        title: "Monitoring Disposisi Pembayaran Polis Asuransi",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-production/packing-list-draft-list",
        name: "garment-production/packing-list-draft-list",
        moduleId: "modules/garment-shipping/packing-list-draft-list/index",
        nav: true,
        title: "LIST | Draft Packing List",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/packing-list-draft-approval",
        name: "garment-shipping/packing-list-draft-approval",
        moduleId: "modules/garment-shipping/packing-list-draft-approval/index",
        nav: true,
        title: "Approval Draft Packing List",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "approval",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/packing-list-approval",
        name: "garment-shipping/packing-list-approval",
        moduleId: "modules/garment-shipping/packing-list-approval/index",
        nav: true,
        title: "Approval Packing List",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "approval",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/packing-list-approved",
        name: "garment-shipping/packing-list-approved",
        moduleId: "modules/garment-shipping/packing-list-approved/index",
        nav: true,
        title: "Approved Packing List",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "approval",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/packing-list-approved-all-user",
        name: "garment-shipping/packing-list-approved-all-user",
        moduleId: "modules/garment-shipping/packing-list-approved-all-user/index",
        nav: true,
        title: "Approved Packing List ( All User )",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "approval",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/payment-disposition",
        name: "garment-shipping/payment-disposition",
        moduleId: "modules/garment-shipping/payment-disposition/index",
        nav: true,
        title: "Lampiran Disposisi Pembayaran Shipment ",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/payment-disposition",
        name: "garment-shipping/monitoing/payment-disposition",
        moduleId: "modules/garment-shipping/monitoring/garment-payment-disposition-report/index",
        nav: true,
        title: "Monitoring Disposisi Pembayaran Shipment",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/payment-disposition-recap",
        name: "garment-shipping/payment-disposition-recap",
        moduleId: "modules/garment-shipping/payment-disposition-recap/index",
        nav: true,
        title: "Lampiran Rekap Disposisi Pembayaran EMKL ",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/payment-disposition-recap",
        name: "garment-shipping/monitoing/payment-disposition-recap",
        moduleId: "modules/garment-shipping/monitoring/garment-payment-disposition-recap-report/index",
        nav: true,
        title: "Monitoring Rekap Disposisi Pembayaran Shipment",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "monitoring",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/cost-structure",
        name: "garment-shipping/cost-structure",
        moduleId: "modules/garment-shipping/cost-structure/index",
        nav: true,
        title: "Struktur Biaya",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "transaksi",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-sales-note-approval",
        name: "garment-shipping/local-sales-note-approval",
        moduleId: "modules/garment-shipping/local-sales-note-approval/index",
        nav: true,
        title: "Approval Penjualan Lokal",
        auth: true,
        settings: {
            group: "g-shipping",
            subGroup: "approval",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
]
