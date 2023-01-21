export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Report Kartu Debitur Lokal' }
        ]);
        this.router = router;
    }
}
