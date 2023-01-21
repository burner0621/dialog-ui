export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'Bukti Pengeluaran Bank' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Bukti Pengeluaran Bank' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Bukti Pengeluaran Bank' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Bukti Pengeluaran Bank' }
        ]);

        this.router = router;
    }
}
