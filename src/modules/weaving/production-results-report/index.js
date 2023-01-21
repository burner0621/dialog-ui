export class Index {
    configureRouter(config, router) {
      config.map([{
          route: ['', 'list'],
          moduleId: './list',
          name: 'list',
          nav: true,
          title: 'List : Laporan Hasil Produksi'
        },
        // {
        //   route: "view/:Id",
        //   moduleId: "./view",
        //   name: "view",
        //   nav: false,
        //   title: "View: Laporan Hasil Produksi"
        // }
      ]);
  
      this.router = router;
    }
  }
  