export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Unit' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Unit' },
      { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Unit' },
      { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Unit' },
    ]);

    this.router = router;
  }
}
