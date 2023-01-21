export class DropdownTextValueConverter {
  toView(item, field) {
    if (!item)
      return "";
    else if (typeof item === "string")
      return item;
    else if (typeof item === "object" && field) {
      return item[field];
    }
    else
      return item.toString();
  }
}
