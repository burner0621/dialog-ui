export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Sewing DO' },
            // { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Bukti Pengantar' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Sewing DO' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Sewing DO' },
        ]);
        this.router = router;
    }
}