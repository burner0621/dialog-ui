import { inject, bindable, computedFrom } from "aurelia-framework";
import { PermissionHelper } from "../../../utils/permission-helper";

@inject(PermissionHelper)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };
  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || "").toString() != "";
  }

  constructor(permissionHelper) {
    this.permissions = permissionHelper.getUserPermissions();
    // console.log(this.permissions);
    this.isPermitted = this.isPermittedRole();
  }

  isPermittedRole() {
    // this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
    let roleRules = ["C9", "B1"];

    for (var key in this.permissions) {
      let hasPermittedRole = roleRules.find((roleRule) => roleRule == key);
      if (hasPermittedRole) return true;
    }

    return false;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }
}
