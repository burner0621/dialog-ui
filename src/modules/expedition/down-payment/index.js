export class Index {
  configureRouter(config, router) {
      config.map([
          { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List:  Bukti Pemasukan Bank' },
          { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:  Bukti Pemasukan Bank' },
          { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:   Bukti Pemasukan Bank' },
          { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:  Bukti Pemasukan Bank' },
      ]);

      this.router = router;
  }
}
