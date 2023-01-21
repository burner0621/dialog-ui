export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Report Kartu Debitur' }
        ]);
        this.router = router;
    }
}
