export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Output Hasil Produksi Spinning' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Output Hasil Produksi Spinning' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Output Hasil Produksi Spinning' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Output Hasil Produksi Spinning' },
        ]);

        this.router = router;
    }
}