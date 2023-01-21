module.exports = [
    {
        route: '/garment-production/comodity-price',
        name: 'comodity-price',
        moduleId: './modules/garment-production/comodity-price/index',
        nav: true,
        title: 'Master Tarif',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "master",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }, {
        route: '/garment-production/scrap-source',
        name: 'garment-production-scrap-source',
        moduleId: './modules/garment-production/scrap-source/index',
        nav: true,
        title: 'Master Asal Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-classifications',
        name: 'garment-production-scrap-classifications',
        moduleId: './modules/garment-production/scrap-classification/index',
        nav: true,
        title: 'Master Jenis Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "master",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-destinations',
        name: 'garment-production-scrap-destinations',
        moduleId: './modules/garment-production/scrap-destination/index',
        nav: true,
        title: 'Master Tujuan Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/preparing',
        name: 'preparing',
        moduleId: './modules/garment-production/preparing/index',
        nav: true,
        title: 'Preparing',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/preparing-alluser',
        name: 'preparing',
        moduleId: './modules/garment-production/preparing_alluser/index',
        nav: true,
        title: 'Preparing (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/delivery-return',
        name: 'garment-production-delivery-return',
        moduleId: './modules/garment-production/delivery-return/index',
        nav: true,
        title: 'Retur Proses',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/delivery-return-alluser',
        name: 'garment-production-delivery-return-alluser',
        moduleId: './modules/garment-production/delivery-return-alluser/index',
        nav: true,
        title: 'Retur Proses (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-product',
        name: 'aval-product',
        moduleId: './modules/garment-production/aval-product/index',
        nav: true,
        title: 'Aval Kain Besar',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-product-alluser',
        name: 'aval-product-alluser',
        moduleId: './modules/garment-production/aval-product-alluser/index',
        nav: true,
        title: 'Barang Aval (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/cutting-in',
        name: 'garment-production-cutting-in',
        moduleId: './modules/garment-production/cutting-in/index',
        nav: true,
        title: 'Cutting-In',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/cutting-in-alluser',
        name: 'garment-production-cutting-in-alluser',
        moduleId: './modules/garment-production/cutting-in-alluser/index',
        nav: true,
        title: 'Cutting-In (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/cutting-out',
        name: 'garment-production-cutting-out',
        moduleId: './modules/garment-production/cutting-out/index',
        nav: true,
        title: 'Cutting-Out',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/cutting-out-alluser',
        name: 'garment-production-cutting-out-alluser',
        moduleId: './modules/garment-production/cutting-out-alluser/index',
        nav: true,
        title: 'Cutting-Out (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/subcon-cutting-out',
        name: 'garment-production-subcon-cutting-out',
        moduleId: './modules/garment-production/subcon-cutting-out/index',
        nav: true,
        title: 'Cutting-Out Subkon',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {

        route: '/garment-production/subcon-cutting-out-alluser',
        name: 'garment-production-subcon-cutting-out-alluser',
        moduleId: './modules/garment-production/subcon-cutting-out-alluser/index',
        nav: true,
        title: 'Cutting-Out Subkon (Semua User)',

        route: '/garment-production/aval-component',
        name: 'garment-production-aval-component',
        moduleId: './modules/garment-production/aval-component/index',
        nav: true,
        title: 'Aval Komponen',

        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-do',
        name: 'garment-production-sewing-do',
        moduleId: './modules/garment-production/sewing-do/index',
        nav: true,
        title: 'Sewing DO',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-do-alluser',
        name: 'garment-production-sewing-do-alluser',
        moduleId: './modules/garment-production/sewing-do-alluser/index',
        nav: true,
        title: 'Sewing DO (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/loading',
        name: 'garment-production-loading',
        moduleId: './modules/garment-production/loading/index',
        nav: true,
        title: 'Loading',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/loading-alluser',
        name: 'garment-production-loading-alluser',
        moduleId: './modules/garment-production/loading-alluser/index',
        nav: true,
        title: 'Loading (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-in',
        name: 'garment-production-sewing-in',
        moduleId: './modules/garment-production/sewing-in/index',
        nav: true,
        title: 'Sewing In',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-in-alluser',
        name: 'garment-production-sewing-in-alluse',
        moduleId: './modules/garment-production/sewing-in-alluser/index',
        nav: true,
        title: 'Sewing In (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-out',
        name: 'garment-production-sewing-out',
        moduleId: './modules/garment-production/sewing-out/index',
        nav: true,
        title: 'Sewing Out',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-out-alluser',
        name: 'garment-production-sewing-out-alluser',
        moduleId: './modules/garment-production/sewing-out-alluser/index',
        nav: true,
        title: 'Sewing Out (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/finishing-in',
        name: 'garment-production-finishing-in',
        moduleId: './modules/garment-production/finishing-in/index',
        nav: true,
        title: 'Finishing In',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            // permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/finishing-in-alluser',
        name: 'garment-production-finishing-in-alluser',
        moduleId: './modules/garment-production/finishing-in-alluser/index',
        nav: true,
        title: 'Finishing In (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/subcon-finishing-in',
        name: 'garment-production-subcon-finishing-in',
        moduleId: './modules/garment-production/subcon-finishing-in/index',
        nav: true,
        title: 'Finishing In Subkon',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/subcon-finishing-in-alluser',
        name: 'garment-production-subcon-finishing-in-alluser',
        moduleId: './modules/garment-production/subcon-finishing-in-alluser/index',
        nav: true,
        title: 'Finishing In Subkon (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/finishing-out',
        name: 'garment-production-finishing-out',
        moduleId: './modules/garment-production/finishing-out/index',
        nav: true,
        title: 'Finishing Out',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            // permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/finishing-out-alluser',
        name: 'garment-production-finishing-out-alluser',
        moduleId: './modules/garment-production/finishing-out-alluser/index',
        nav: true,
        title: 'Finishing Out (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/expenditure-good',
        name: 'garment-production-expenditure-good',
        moduleId: './modules/garment-production/expenditure-good/index',
        nav: true,
        title: 'Pengeluaran Barang Jadi',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            // permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/expenditure-good-alluser',
        name: 'garment-production-expenditure-good-alluser',
        moduleId: './modules/garment-production/expenditure-good-alluser/index',
        nav: true,
        title: 'Pengeluaran Barang Jadi (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1, "SG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/expenditure-good-return',
        name: 'garment-production-expenditure-good-return',
        moduleId: './modules/garment-production/expenditure-good-return/index',
        nav: true,
        title: 'Retur Barang Jadi',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/expenditure-good-return-alluser',
        name: 'garment-production-expenditure-good-return-alluser',
        moduleId: './modules/garment-production/expenditure-good-return-alluser/index',
        nav: true,
        title: 'Retur Barang Jadi (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-component',
        name: 'garment-production-aval-component',
        moduleId: './modules/garment-production/aval-component/index',
        nav: true,
        title: 'Aval Komponen',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            // permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-component-alluser',
        name: 'garment-production-aval-component-alluser',
        moduleId: './modules/garment-production/aval-component-alluser/index',
        nav: true,
        title: 'Aval Komponen (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-transaction-in',
        name: 'garment-production-scrap-transaction-in',
        moduleId: './modules/garment-production/scrap-transaction-in/index',
        nav: true,
        title: 'Penerimaan Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-transaction-in-alluser',
        name: 'garment-production-scrap-transaction-in-alluser',
        moduleId: './modules/garment-production/scrap-transaction-in-alluser/index',
        nav: true,
        title: 'Penerimaan Barang Aval (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-transaction-out',
        name: 'garment-production-scrap-transaction-out',
        moduleId: './modules/garment-production/scrap-transaction-out/index',
        nav: true,
        title: 'Pengeluaran Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/scrap-transaction-out-alluser',
        name: 'garment-production-scrap-transaction-out-alluser',
        moduleId: './modules/garment-production/scrap-transaction-out-alluser/index',
        nav: true,
        title: 'Pengeluaran Barang Aval (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/customs/pemasukan-tc-kecil',
        name: 'monitoring-pemasukan-tc-kecil',
        moduleId: './modules/customs/tc-kecil-in/index',
        nav: true,
        title: 'Laporan Monitoring Pemasukan Aval TC Kecil',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
            iconClass: 'fa fa-dashboard'
        },

    },
    {
        route: '/customs/pengeluaran-tc-kecil',
        name: 'monitoring-pengeluaran-tc-kecil',
        moduleId: './modules/customs/tc-kecil-out/index',
        nav: true,
        title: 'Laporan Monitoring Pengeluaran Aval TC Kecil',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1,"PG": 1,"B1": 1 ,"C2A":1 },
            iconClass: 'fa fa-dashboard'
        },

    },
    
    {
        route: '/customs/pemasukan-sampah-sapuan',
        name: 'monitoring-pemasukan-sampah-sapuan',
        moduleId: './modules/customs/sapuan-in/index',
        nav: true,
        title: 'Laporan Monitoring Pemasukan Aval Sampah Sapuan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: { "C9": 1,"PG": 1,"B1": 1 ,"C2A":1 },
            iconClass: 'fa fa-dashboard'
        },

    },
    {
        route: '/customs/pengeluaran-sampah-sapuan',
        name: 'monitoring-pengeluaran-sampah-sapuan',
        moduleId: './modules/customs/sapuan-out/index',
        nav: true,
        title: 'Laporan Monitoring Pengeluaran Aval Sampah Sapuan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
            iconClass: 'fa fa-dashboard'
        },

    },
    {
        route: '/garment-production/adjustment-loading',
        name: 'garment-production-adjustment-loading',
        moduleId: './modules/garment-production/adjustment-loading/index',
        nav: true,
        title: 'Adjustment Loading',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "adjustment",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-loading-alluser',
        name: 'garment-production-adjustment-loading-alluser',
        moduleId: './modules/garment-production/adjustment-loading-alluser/index',
        nav: true,
        title: 'Adjustment Loading (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "adjustment",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-sewing',
        name: 'garment-production-adjustment-sewing',
        moduleId: './modules/garment-production/adjustment-sewing/index',
        nav: true,
        title: 'Adjustment Sewing',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "adjustment",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-sewing-alluser',
        name: 'garment-production-adjustment-sewing-alluser',
        moduleId: './modules/garment-production/adjustment-sewing-alluser/index',
        nav: true,
        title: 'Adjustment Sewing (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "adjustment",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-finishing',
        name: 'garment-production-adjustment-finishing',
        moduleId: './modules/garment-production/adjustment-finishing/index',
        nav: true,
        title: 'Adjustment Finishing',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "adjustment",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            // permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-finishing-alluser',
        name: 'garment-production-adjustment-finishing-alluser',
        moduleId: './modules/garment-production/adjustment-finishing-alluser/index',
        nav: true,
        title: 'Adjustment Finishing (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "adjustment",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-expenditure-good',
        name: 'garment-production-adjustment-expenditure-good',
        moduleId: './modules/garment-production/adjustment-expenditure-good/index',
        nav: true,
        title: 'Adjustment Barang Jadi',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "adjustment",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            // permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-expenditure-good-alluser',
        name: 'garment-production-adjustment-expenditure-good-alluser',
        moduleId: './modules/garment-production/adjustment-expenditure-good-alluser/index',
        nav: true,
        title: 'Adjustment Barang Jadi (Semua User)',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "adjustment",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/adjustment-cutting',
        name: 'garment-production-adjustment-cutting',
        moduleId: './modules/garment-production/adjustment-cutting/index',
        nav: true,
        title: 'Adjustment Cutting',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "adjustment",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-prepare',
        name: 'garment-production-monitoring-prepare',
        moduleId: './modules/garment-production/monitoring-prepare/index',
        nav: true,
        title: 'Monitoring Prepare',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },

            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-prepare-bookkeeping',
        name: 'garment-production-monitoring-prepare-bookkeeping',
        moduleId: './modules/garment-production/monitoring-prepare-bookkeeping/index',
        nav: true,
        title: 'Monitoring Prepare Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            // permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-cutting',
        name: 'garment-production-monitoring-cutting',
        moduleId: './modules/garment-production/monitoring-cutting/index',
        nav: true,
        title: 'Monitoring Cutting',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-cutting-bookkeeping',
        name: 'garment-production-monitoring-cutting-bookkeeping',
        moduleId: './modules/garment-production/monitoring-cutting-bookkeeping/index',
        nav: true,
        title: 'Monitoring Cutting Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "transaksi",
            // permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-loading',
        name: 'garment-production-monitoring-loading',
        moduleId: './modules/garment-production/monitoring-loading/index',
        nav: true,
        title: 'Monitoring Loading',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-loading-bookkeeping',
        name: 'garment-production-monitoring-loading-bookkeeping',
        moduleId: './modules/garment-production/monitoring-loading-bookkeeping/index',
        nav: true,
        title: 'Monitoring Loading Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            // permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-sewing',
        name: 'garment-production-monitoring-sewing',
        moduleId: './modules/garment-production/monitoring-sewing/index',
        nav: true,
        title: 'Monitoring Sewing',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }, {
        route: '/garment-production/monitoring-sewing-bookkeeping',
        name: 'garment-production-monitoring-sewing-bookkeeping',
        moduleId: './modules/garment-production/monitoring-sewing-bookkeeping/index',
        nav: true,
        title: 'Monitoring Sewing Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            // permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-finishing',
        name: 'garment-production-monitoring-finishing',
        moduleId: './modules/garment-production/monitoring-finishing/index',
        nav: true,
        title: 'Monitoring Finishing',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },

            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-finishing-bookkeeping',
        name: 'garment-production-monitoring-finishing-bookkeeping',
        moduleId: './modules/garment-production/monitoring-finishing-bookkeeping/index',
        nav: true,
        title: 'Monitoring Finishing Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            // permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-expenditure-good-delivery',
        name: 'garment-production-monitoring-expenditure-good-delivery',
        moduleId: './modules/garment-production/monitoring-expenditure-good-delivery/index',
        nav: true,
        title: 'Monitoring Pengiriman Barang Jadi',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },

            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-expenditure-good-delivery-bookkeeping',
        name: 'garment-production-monitoring-expenditure-good-delivery-bookkeeping',
        moduleId: './modules/garment-production/monitoring-expenditure-good-delivery-bookkeeping/index',
        nav: true,
        title: 'Monitoring Pengiriman Barang Jadi Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            // permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-production-flow-by-size',
        name: 'garment-production-monitoring-production-flow-by-size',
        moduleId: './modules/garment-production/monitoring-production-flow-by-size/index',
        nav: true,
        title: 'Monitoring Flow Produksi per Size',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-production-flow-by-size-bookkeeping',
        name: 'garment-production-monitoring-production-flow-by-size-bookkeeping',
        moduleId: './modules/garment-production/monitoring-production-flow-by-size-bookkeeping/index',
        nav: true,
        title: 'Monitoring Flow Produksi per Size Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            // permission: {"C9": 1, "B1":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-production-stock-flow',
        name: 'garment-production-monitoring-production-stock-flow',
        moduleId: './modules/garment-production/monitoring-production-stock-flow/index',
        nav: true,
        title: 'Monitoring Flow Persediaan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-production-stock-flow-bookkeeping',
        name: 'garment-production-monitoring-production-stock-flow-bookkeeping',
        moduleId: './modules/garment-production/monitoring-production-stock-flow-bookkeeping/index',
        nav: true,
        title: 'Monitoring Flow Persediaan Pembukuan',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "laporan",
            // permission: {"C9": 1, "B1":1},

            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/production-flow-feature',
        name: 'garment-production-production-flow-feature',
        moduleId: './modules/garment-production/production-flow-feature/index',
        nav: true,
        title: 'Fitur Flow Barang Produksi',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "fitur",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/change-date-feature',
        name: 'garment-production-change-date-feature',
        moduleId: './modules/garment-production/change-date-feature/index',
        nav: true,
        title: 'Fitur Ubah Tanggal',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "fitur",
            permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    // {
    //     route: "garment-production/packing-list",
    //     name: "garment-production/packing-list",
    //     moduleId: "modules/garment-production/packing-list/index",
    //     nav: true,
    //     title: "Packing List",
    //     auth: true,
    //     settings: {
    //         group: "g-production",
    //         permission: { "C9": 1 },
    //         iconClass: "fa fa-dashboard"
    //     }
    // },

    {
        route: "garment-production/stock-opname",
        name: "garment-production/stock-opname",
        moduleId: "modules/garment-production/stock-opname/index",
        nav: true,
        title: "Stock Opname",
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "fitur",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-production/packing-list-draft",
        name: "garment-production/packing-list-draft",
        moduleId: "modules/garment-production/packing-list-draft/index",
        nav: true,
        title: "Draft Packing List",
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "packing list",
            permission: { "C9": 1, "FP": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-production/packing-list-items",
        name: "garment-production/packing-list-items",
        moduleId: "modules/garment-production/packing-list-items/index",
        nav: true,
        title: "Item Packing List",
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "packing list",
            permission: { "C9": 1, "FP": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: 'garment-production/packing-list-draft-copy',
        name: 'packing-list-draft-copy',
        moduleId: './modules/garment-production/packing-list-draft/copy/index',
        nav: true,
        title: 'Copy Draft Packing List',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "packing list",
            permission: { "C9": 1, "FP": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: "garment-production/packing-list-item-draft",
        name: "garment-production/packing-list-item-draft",
        moduleId: "modules/garment-production/packing-list-item-draft/index",
        nav: true,
        title: "Draft RO Packing List",
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "packing list",
            permission: { "C9": 1, "FP": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    /*{
        route: "garment-production/packing-list-items-enhanced",
        name: "garment-production/packing-list-items-enhanced",
        moduleId: "modules/garment-production/packing-list-items-enhanced/index",
        nav: true,
        title: "Item Draft Packing List Enhanced",
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "packing list",
            permission: { "C9": 1, "FP": 1 },
            iconClass: "fa fa-dashboard"
        }
    },*/
    {
        route: 'garment-production/packing-list-items-draft-enhanced',
        name: 'packing-list-draft-items-enhanced',
        moduleId: './modules/garment-production/packing-list-items-draft-enhanced/index',
        nav: true,
        title: 'Item Draft Packing List Enhanced 2',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "packing list",
            permission: { "C9": 1, "FP": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/customs/machine/brand',
        name: 'machine-brand',
        moduleId: './modules/customs/machine/master-brand/index',
        nav: true,
        title: 'Master Brand',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "machine",
            permission: { "C9": 1,"MCH": 1 },
            iconClass: 'fa fa-dashboard'
        },
    },
    {
        route: '/customs/machine/category',
        name: 'machine-category',
        moduleId: './modules/customs/machine/master-category/index',
        nav: true,
        title: 'Master Kategori',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "machine",
            permission: { "C9": 1,"MCH": 1  },
            iconClass: 'fa fa-dashboard'
        },
    },
    // {
    //     route: '/customs/machine/in',
    //     name: 'machine-in',
    //     moduleId: './modules/customs/machine/in/index',
    //     nav: true,
    //     title: 'Transaksi Masuk (Mesin Baru)',
    //     auth: true,
    //     settings: {
    //         group: "g-production",
    //         subGroup: "machine",
    //         permission: { "C9": 1,"B6": 1,"B1": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     },
    // },
    // {
    //     route: '/customs/machine/out',
    //     name: 'machine-out',
    //     moduleId: './modules/customs/machine/out/index',
    //     nav: true,
    //     title: 'Transaksi Keluar',
    //     auth: true,
    //     settings: {
    //         group: "g-production",
    //         subGroup: "machine",
    //         permission: { "C9": 1,"B6": 1,"B1": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     },
    // },
    {
        route: '/customs/machine/machines',
        name: 'machines',
        moduleId: './modules/customs/machine/machines/index',
        nav: true,
        title: 'Mesin',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "machine",
            permission: { "C9": 1,"MCH": 1  },
            iconClass: 'fa fa-dashboard'
        },
    },
    {
        route: '/customs/machine/mutation',
        name: 'mutation',
        moduleId: './modules/customs/machine/mutation/index',
        nav: true,
        title: 'Mutasi',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "machine",
            permission: { "C9": 1,"MCH": 1 },
            iconClass: 'fa fa-dashboard'
        },
    },
    {
        route: '/customs/report-aval',
        name: 'report-aval',
        moduleId: './modules/garment-production/scrap-report/index',
        nav: true,
        title: 'Laporan Stock Aval',
        auth: true,
        settings: {
            group: "g-production",
            subGroup: "aval",
            permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
            iconClass: 'fa fa-dashboard'
        },

    },
];
