export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Bukti Pengeluaran Bank DPP + PPN' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Bukti Pengeluaran Bank DPP + PPN' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Bukti Pengeluaran Bank DPP + PPN' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Bukti Pengeluaran Bank DPP + PPN' },
            { route: 'post', moduleId: './post', name: 'post', nav: false, title: 'Post: Bukti Pengeluaran Bank DPP + PPN' }
        ]);

        this.router = router;
    }
}
