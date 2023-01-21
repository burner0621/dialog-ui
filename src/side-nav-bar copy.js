import { inject, bindable, containerless, computedFrom } from 'aurelia-framework';
import { AuthService } from "aurelia-authentication";
import jwtDecode from 'jwt-decode';

@containerless()
@inject(AuthService)
export class SideNavBar {
  @bindable router = null;
  @bindable navigations = null;

  constructor(authService) {
    this.minimized = false;
    this.activeMenu = [];
    this.activeSubMenu = {};
    this.authService = authService;
  }

  @computedFrom('authService.authenticated')
  get isAuthenticated() {
    return this.authService.authenticated;
  }

  @computedFrom('activeMenu')
  get expand() {
    return (this.activeMenu || []).length > 0;
  }

  attached() {

    this.group = new Map();
    const config = this.authService.authentication.config;
    const storage = this.authService.authentication.storage;
    const token = JSON.parse(storage.get(config.storageKey));
    var me = jwtDecode(token.data);

    var routes = this.router.navigation.filter(route => {
      if (route.config.auth !== true)
        return true;

      var routePermission = route.config.settings.permission || {};
      var myPermission = me.permission;

      var routeKeys = Object.getOwnPropertyNames(routePermission);

      if (routeKeys.find(key => key === "*"))
        return true;

      if (routeKeys.length == 0)
        return false;

      var keys = Object.getOwnPropertyNames(myPermission);

      return keys.some(key => {
        var keyFound = routeKeys.find((routeKey) => routeKey === key);
        if (keyFound) {
          var mod = routePermission[keyFound];
          return mod <= myPermission[key];
        }

        return false;
      })
    })

    for (var route of routes) {
      if (route.settings && ((route.settings.group || "").trim().length > 0)) {
        var key = (route.settings.group || "").trim();
        if (!this.group.has(key))
          this.group.set(key, []);

        var groupedRoutes = this.group.get(key);
        groupedRoutes.push(route);
        this.group.set(key, groupedRoutes);
      }
    };
  }

  toggleSideMenu() {
    this.minimized = !this.minimized;
  }

  selectMenu(menu, title) {
    if (this.activeMenu != menu) {
      this.activeMenu = menu;
      this.activeTitle = title;
      this.activeSubMenu = [];
    } else {
      this.activeMenu = [];
      this.activeTitle = '';
      this.activeSubMenu = [];
    }
  }

  selectSubMenu(subMenu) {
    this.minimized = false;
    this.activeMenu = [];
    this.activeSubMenu = {};

    return true;
  }
}
