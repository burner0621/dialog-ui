export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
      { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Saldo Hutang' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Saldo Hutang Garment' },
      { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Saldo Hutang Garment' },
    ]);

    this.router = router;
  }
}
