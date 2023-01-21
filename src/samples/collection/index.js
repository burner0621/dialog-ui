import { bindable, computedFrom } from "aurelia-framework";

export class Index {
  // columns = [
  //   { header: "id", value: "id" },
  //   { header: "name", value: "name" },
  //   { header: "age", value: "age" },
  //   { header: "email", value: "email" }
  // ];
  selectedPerson;
  data = {}

  columns = ["name", "age", "email"];
  hobbyColumns = ["name", "rating"];

  get peopleLoader() {
    return () => {
      return Promise.resolve(this.people);
    }
  }

  people = [
    { id: 1, name: "Alice Ecila", age: 27, email: "alice.ecila@live.com", hobbies: [{ name: "Soccer", rating: 4 }, { name: "Gaming", rating: 5 }, { name: "Dreaming", rating: 4 }] },
    { id: 2, name: "Beatrix Xirtaeb", age: 26, email: "beatrix.xirtaeb@facebook.com", hobbies: [{ name: "Hiking", rating: 5 }, { name: "Traveling", rating: 3 }] },
    { id: 3, name: "Clara Aralc", age: 29, email: "clara.aralc@google.com", hobbies: [{ name: "Reading", rating: 3 }, { name: "Hiking", rating: 4 }, { name: "Traveling", rating: 5 }] },
    { id: 4, name: "Donna Annod", age: 28, email: "donna.annod@twitter.com", hobbies: [{ name: "Coding", rating: 5 }] }];
}
