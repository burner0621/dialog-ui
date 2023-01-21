export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Barang SKU' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Barang SKU' },
      { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Barang SKU' },
      { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Barang SKU' },
    ]);

    this.router = router;
  }
}
