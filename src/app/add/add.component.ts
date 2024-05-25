import { Component } from '@angular/core';
import { EmployeeModel } from '../employee.modal';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

employee:EmployeeModel={}

constructor(private api:ApiServiceService,private router:Router){}

// to clear or reset after clicking cancel button
cancelEmployee(){

  this.employee={}
}

addEmployee(){
  console.log(this.employee);
  this.api.addEmployeeAPI(this.employee).subscribe({
    next:(res:EmployeeModel)=>{
      console.log(res);
      Swal.fire({
        title: 'Yeah',
        text: 'Employee Added Succefully',
        icon: 'success'
      })
      this.router.navigateByUrl('employee')
      
    },
    error:(res:any)=>{
      console.log(res);
      
    }
  })
  
}

}
