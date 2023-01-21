export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Kategori Barang' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Kategori Barang' },
      { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Kategori Barang' },
      { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Kategori Barang' },
    ]);

    this.router = router;
  }
}
