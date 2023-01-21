export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Monitoring Order Diterima dan Booking' },
        ]);

        this.router = router;
    }
}
