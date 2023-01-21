export class Index {
  configureRouter(config, router) {
      config.map([
          { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Verifikasi VB' },
          { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Verifikasi VB' },
          { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Verifikasi VB' },
          { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Verifikasi VB' },
      ]);

      this.router = router;
  }
}
