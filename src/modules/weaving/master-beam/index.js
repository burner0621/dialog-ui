export class Index {
    configureRouter(config, router) {
      config.map([
        {
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List Master Beam"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Master Beam"
        },
        { 
          route: 'edit/:Id', 
          moduleId: './edit', 
          name: 'edit', 
          nav: false, 
          title: 'Edit: Master Beam' 
        }
      ]);
  
      this.router = router;
    }
  }
  