export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Bon Pengiriman Barang Weaving' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Bon Pengiriman Barang Weaving' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Bon Pengiriman Barang Weaving' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Bon Pengiriman Barang Weaving' }
        ]);
  
        this.router = router;
    }
  }
  