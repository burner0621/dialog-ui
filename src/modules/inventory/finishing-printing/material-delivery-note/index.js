export class Index {
  configureRouter(config, router) {
      config.map([
          { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Bon Pengiriman Barang' },
          { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Bon Pengiriman Barang' },
          { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Bon Pengiriman Barang' },
          { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Bon Pengiriman Barang' }
      ]);

      this.router = router;
  }
}
