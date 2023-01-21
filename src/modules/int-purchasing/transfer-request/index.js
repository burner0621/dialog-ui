export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Transfer Request' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Transfer Request' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Transfer Request' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Transfer Request' }
        ]);

        this.router = router;
    }
}
