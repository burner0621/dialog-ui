export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Barang Fabric SKU' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Barang Fabric SKU' },
      { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Barang Fabric SKU' },
      { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Barang Fabric SKU' },
    ]);

    this.router = router;
  }
}
