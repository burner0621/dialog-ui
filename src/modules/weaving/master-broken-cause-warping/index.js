export class Index {
    configureRouter(config, router) {
      config.map([{
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List Master Penyebab Putus Warping"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Master Penyebab Putus Warping"
        },
        {
          route: 'view/:Id',
          moduleId: './view',
          name: 'view',
          nav: false,
          title: 'View: Master Penyebab Putus Warping'
        },
        {
          route: 'edit/:Id',
          moduleId: './edit',
          name: 'edit',
          nav: false,
          title: 'Edit: Master Penyebab Putus Warping'
        }
      ]);
  
      this.router = router;
    }
  }
  