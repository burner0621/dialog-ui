import { bindable, computedFrom } from "aurelia-framework";

export class Index {
  value;
  stringValue;

  label = "dropdown";
  options = {
    label: {
      length: 4,
      align: "right"
    },
    control: {
      length: 8
    }
  };

  constructor() {
    this.context = this;
  }

  objects = [
    { "code": "ITEM001", "name": "ITEM 001", "description": "some description for ITEM 001" },
    { "code": "ITEM002", "name": "ITEM 002", "description": "some description for ITEM 002" },
    { "code": "ITEM003", "name": "ITEM 003", "description": "some description for ITEM 003" },
    { "code": "ITEM004", "name": "ITEM 004", "description": "some description for ITEM 004" }
  ];

  get loader() {
    return (keyword) => fetch("https://api.github.com/users")
      .then(response => response.json())
  }

  changeCallback($event) {
    console.log(this.value)
  }


  get _selector() {
    var selector = { key: "code", text: "name" };
    // if (this.key)
    //   selector.key = this.key;

    // if (this.text)
    //   selector.text = this.text;
    return selector;
  }

  _matcher = (option, current) => {
    var result = false;
    if (!option || !current)
      return result;

    result = option[this._selector.key] === current[this._selector.key];
    return result;
  }
}
