export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Subcon Jasa - Sewing' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Subcon Jasa - Sewing' },
      { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Subcon Jasa - Sewing' },
      { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Subcon Jasa - Sewing' },
      { route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'Excel: Subcon Jasa - Sewing' },
    ]); 
    this.router = router;
  }
}
