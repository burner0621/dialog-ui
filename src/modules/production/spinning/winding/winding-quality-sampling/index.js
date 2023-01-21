export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Quality Hasil Produksi Spinning' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Quality Hasil Produksi Spinning' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Quality Hasil Produksi Spinning' }
        ]);

        this.router = router;
    }
}