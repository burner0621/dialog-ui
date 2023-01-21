export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', '/list'], moduleId: './list', name: 'list', nav: false, title: 'Deal Tracking Reports' },
      { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Deal Tracking Reports' },
      { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Deal Tracking Reports' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Deal Tracking Reports' }
    ]);

    this.router = router;
  }
}