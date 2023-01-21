export class Index {
    configureRouter(config, router) {
      config.map([{
        route: ['', 'list'],
        moduleId: './list',
        name: 'list',
        nav: true,
        title: 'List : Laporan Operasional Mesin Harian Reaching'
      }, ]);
  
      this.router = router;
    }
  }
  