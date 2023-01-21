import numeral from "numeral";

export class Item {
  constructor() {}

  activate(context) {
    this.data = context.data;
    this.isObject = typeof context.data === "object" ? true : false;
    this.colspan = context.context.columns.length;
    if (context.context.options) {
      this.readOnly = context.context.options.readOnly;
    }
  }
}

export class ObjectKeysValueConverter {
  toView(obj) {
    // Create a temporary array to populate with object keys
    let temp = [];

    // A basic for..in loop to get object properties
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...in
    for (let prop in obj) {
      if (
        obj.hasOwnProperty(prop) &&
        prop.toLowerCase() !== "layoutorder" &&
        prop.toLowerCase() !== "currencyrate"
      ) {
        const item =
          typeof obj[prop] === "number"
            ? numeral(obj[prop]).format("0,000.00")
            : obj[prop];
        temp.push(item);
      }
    }

    return temp;
  }
}
