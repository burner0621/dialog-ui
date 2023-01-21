import { bindable, computedFrom } from "aurelia-framework";

export class Index {
  x;
  label = "autocomplete";
  stringValue;

  options = {
    label: {
      length: 4,
      align: "right"
    },
    control: {
      length: 8
    }
  }; 

  get loader() { 
    return (keyword) => {
      return fetch("https://api.github.com/users").then(response => response.json())
    }
  }

  // selectCallback($event) {
  //   console.log("selectCallback");
  //   var selected = this.x;
  //   console.log(selected);
  //   this.x = null;
  //   this.stringValue = JSON.stringify(selected);
  // } 
  changeCallback($event) {
    // console.log(this.value);
    var selected = this.x;
    // this.x = null;
    this.stringValue = JSON.stringify(selected);
  } 
}
