export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Garment Unit Receipt Note' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Garment Unit Receipt Note' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Garment Unit Receipt Note' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Garment Unit Receipt Note' },
        ]);

        this.router = router;
    }
}