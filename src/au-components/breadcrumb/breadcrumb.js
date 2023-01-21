import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";

@customElement("au-breadcrumb")
@inject(Element)
export class BreadCrumb {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) bread;

  constructor(element) {
    this.component = element;
  }

}

/* Usage
  1. Create An Html Element
      <au-breadcrumb bread.bind="bread"></au-breadcrumb>
  2. Create Method in View Model
    activate(params, routeConfig, navigationInstruction) {
      const instruction = navigationInstruction.getAllInstructions()[0];
      const parentInstruction = instruction.parentInstruction;
      this.bread = {
        title : parentInstruction.config.title,
        titleHref : this.router.generate(parentInstruction.config.name),
        subtitle : instruction.config.title
      };
    }
*/


