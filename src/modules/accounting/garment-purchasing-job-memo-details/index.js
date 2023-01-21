export class Index {
  configureRouter(config, router) {
      config.map([
          { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Rincian Memorial Pembelian Job Garment' },
          { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Rincian Memorial Pembelian Job Garment' },
          { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Rincian Memorial Pembelian Job Garment' },
          { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Rincian Memorial Pembelian Job Garment' }
      ]);

      this.router = router;
  }
}