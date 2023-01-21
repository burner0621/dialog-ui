import { bindable, computedFrom, customElement } from "aurelia-framework";

@customElement("input-form")
export class Index {
  text = "hello";


  items = [
    {id:1, login:"item-01"},  
    {id:2, login:"item-02"},  
    {id:3, login:"item-03"},
    {id:4, login:"item-01"},  
    {id:5, login:"item-02"},  
    {id:6, login:"item-03"},
    {id:7, login:"item-01"},  
    {id:8, login:"item-02"},  
    {id:9, login:"item-03"},
    {id:10, login:"item-010"},  
    {id:11, login:"item-011"},  
    {id:12, login:"item-012"},
    {id:13, login:"item-013"},  
    {id:14, login:"item-014"},  
    {id:15, login:"item-015"},
    {id:16, login:"item-016"},  
    {id:17, login:"item-017"},  
    {id:18, login:"item-018"},
    {id:19, login:"item-019"},  
    {id:20, login:"item-020"},  
    {id:21, login:"item-021"},
    {id:22, login:"item-022"},  
    {id:23, login:"item-023"},  
    {id:24, login:"item-024"},
    {id:25, login:"item-025"},  
    {id:26, login:"item-026"},  
    {id:27, login:"item-027"},
    {id:28, login:"item-028"},  
    {id:29, login:"item-029"},  
    {id:30, login:"item-030"},
    {id:31, login:"item-031"},  
    {id:32, login:"item-032"},  
    {id:33, login:"item-033"},
    {id:34, login:"item-034"},  
    {id:35, login:"item-035"},  
    {id:36, login:"item-036"}
  ];
  
  data = (info) => {
      return fetch("https://api.github.com/users")
        .then(result=> result.json())
        .then(json => {
          return {
            total: json.length,
            data: json
          }
        });
    } 
  context = ["create", "update", "delete"]
  add()
  {
     let newData =  {id:5, login:"item-05"} ;
     this.items.push(newData);
     
    $(this.table).bootstrapTable()
  }
  
  rowClickCallback(event)
  {
    console.log(event.detail)
  }
  
  contextClickCallback(event)
  {
    var param = event.detail;
    console.log(param)
  }
  
  sel()
  {
    console.log(this.selections)
  }
  
  showContextCallback(a, b, data)
  {
    console.log(data)
    return a % 2 === data.id % 2;
    
    // console.log(data)
    // console.log("showContextCallback")
    // return false;
  }
}
