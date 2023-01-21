export class Index {
  configureRouter(config, router) {
    config.map([{
        route: ['', 'list'],
        moduleId: './list',
        name: 'list',
        nav: true,
        title: 'List : Laporan Operasional Mesin Harian Loom'
      },
      {
        route: "view/:Id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Operasional Mesin Harian Loom"
      }
    ]);

    this.router = router;
  }
}
