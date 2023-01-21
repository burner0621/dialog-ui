import {
  inject,
  bindable,
  containerless,
  computedFrom,
} from "aurelia-framework";
import { AuthService } from "aurelia-authentication";
import jwtDecode from "jwt-decode";

@containerless()
@inject(AuthService)
export class SideNavBar {
  @bindable router = null;
  @bindable navigations = null;

  constructor(authService) {
    this.minimized = false;
    this.activeMenu = new Map();
    // NEW CODE
    this.activeSubMenu = [];
    this.activeItem = {};

    this.authService = authService;
  }

  @computedFrom("authService.authenticated")
  get isAuthenticated() {
    return this.authService.authenticated;
  }

  @computedFrom("activeMenu")
  get expand() {
    return (this.activeMenu || new Map()).size > 0;
  }

  // NEW CODE
  @computedFrom("activeSubMenu")
  get expandMore() {
    return (this.activeSubMenu || []).length > 0;
  }

  attached() {
    const config = this.authService.authentication.config;
    const storage = this.authService.authentication.storage;
    const token = JSON.parse(storage.get(config.storageKey));
    var me = jwtDecode(token.data);

    var routes = this.router.navigation.filter((route) => {
      if (route.config.auth !== true) return true;

      var routePermission = route.config.settings.permission || {};
      var myPermission = me.permission;

      var routeKeys = Object.getOwnPropertyNames(routePermission);

      if (routeKeys.find((key) => key === "*")) return true;

      if (routeKeys.length == 0) return false;

      var keys = Object.getOwnPropertyNames(myPermission);

      return keys.some((key) => {
        var keyFound = routeKeys.find((routeKey) => routeKey === key);
        if (keyFound) {
          var mod = routePermission[keyFound];
          return mod <= myPermission[key];
        }

        return false;
      });
    });

    // NEW CODE
    this.group = new Map();

    for (var route of routes) {
      if (route.settings && (route.settings.group || "").trim().length > 0) {
        // if (
        //   route.settings &&
        //   (route.settings.subGroup || "").trim().length > 0
        // ) {
        var key = (route.settings.group || "uncategorized").trim();
        var subKey = (route.settings.subGroup || "uncategorized").trim();

        if (!this.group.has(key)) this.group.set(key, new Map());

        var groupedRoutes = this.group.get(key);
        if (!groupedRoutes.has(subKey)) groupedRoutes.set(subKey, []);

        var subGroupedRoutes = groupedRoutes.get(subKey);
        subGroupedRoutes.push(route);
        groupedRoutes.set(subKey, subGroupedRoutes);

        // }
      }
    }
    // console.log("this.group", this.group);
  }

  toggleSideMenu() {
    this.minimized = !this.minimized;
  }

  // NEW CODE
  selectMenu(key, value) {
    this.hasNoSubGroup = value.get("uncategorized");

    if (this.activeMenu != value) {
      this.activeMenu = value;
      this.activeTitle = key;
      this.activeSubMenu = [];
    } else {
      this.activeMenu = new Map();
      this.activeTitle = "";
      this.activeSubMenu = [];
    }

    // if (this.activeMenu.has("uncategorized")) {
    //   this.activeMenu.delete("uncategorized");
    // }

    // console.log("this.activeTitle/key", this.activeTitle);
    // console.log("this.activeMenu/value", this.activeMenu);
    // console.log("this.hasNoSubGroup", this.hasNoSubGroup);
  }

  selectSubMenu(key, value) {
    if (this.activeSubMenu != value) {
      this.activeSubMenu = value;
      this.activeSubtitle = key;
      this.activeItem = {};
    } else {
      this.activeSubMenu = [];
      this.activeSubtitle = "";
      this.activeItem = {};
    }

    // console.log("this.activeSubtitle/key", this.activeSubtitle);
    // console.log("this.activeSubMenu/value", this.activeSubMenu);
  }

  selectItem() {
    this.minimized = false;
    this.activeMenu = new Map();
    this.activeSubMenu = [];
    this.activeItem = {};

    return true;
  }
}
