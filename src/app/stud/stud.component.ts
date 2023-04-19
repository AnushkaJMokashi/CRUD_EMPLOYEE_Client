import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stud',
  templateUrl: './stud.component.html',
  styleUrls: ['./stud.component.scss']
})
export class StudComponent {

  EmployeeArray: any[] = [];
  currentEmployeeID = "";

  name: string="";
  address: string="";
  phone: string="";

  constructor(private http:HttpClient){
    console.log("getting")
    this.getAllEmployee();
    
  }
  getAllEmployee() {
    this.http.get("http://localhost:8000/user/getAll")
    .subscribe(async (resultData:any)=>{
      
      this.EmployeeArray = await resultData;
      console.log(this.EmployeeArray);
    })
    
  }

  // setDelete(data: any) {
  //   this.http.delete("http://localhost:8000/user/remove"+"/"+data._id).subscribe((resultData: any)=>
  //   {
  //     console.log(resultData);
  //     alert("Employee Deleted...")
  //     this.getAllEmployee();
  //   });

  // }

  setDelete(data: any) {
    this.http.delete("http://localhost:8000/user/remove"+"/"+data._id).subscribe((resultData: any)=>
    {
      console.log(resultData);
      alert("Employee Deleted...")
      this.getAllEmployee();
    });

  }
  


  setUpdate(data: any) {
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;

    this.currentEmployeeID = data._id;

  }

  UpdateRecords()
  {
    let bodyData = {
      "name":this.name,
      "address":this.address,
      "phone":this.phone
    };
    this.http.put("http://localhost:8000/user/update"+"/"+this.currentEmployeeID,bodyData).subscribe((resultData: any)=>{
      console.log(resultData);
      alert("Employee Edited Successfully..")
      this.getAllEmployee();
    }
    );

  }

  save(){
    if(this.currentEmployeeID==''){
      this.register();
    }else{
      this.UpdateRecords();
    }
  }


  
  register()
  {
    let bodyData = {
      "name":this.name,
      "address":this.address,
      "phone":this.phone
    };
    this.http.post("http://localhost:8000/user/create",bodyData).subscribe((resultData: any)=>{
      console.log(resultData);
      alert("Employee Registered Successfully..")
      this.name = '';
      this.address = '';
      this.phone = '';
      this.getAllEmployee();
    }
    );
  }

}


