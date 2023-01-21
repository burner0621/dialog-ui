export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Blocking Plan Sewing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Blocking Plan Sewing' },
            { route: 'create', moduleId: './create', name: 'create', nav: true, title: 'Create' } 
        ]);
        this.router = router;
    }
}