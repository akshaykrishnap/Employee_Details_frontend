import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { EmployeeModel } from '../employee.modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  Employee:EmployeeModel={}

  constructor(private route:ActivatedRoute, private api:ApiServiceService, private router:Router){}

  /* Activated route class is used to access id from the url  */

  ngOnInit(): void {
    this.route.params.subscribe((res)=>{
      const {id} =res
      console.log(id);
      this.getExistingUser(id)
  
    })
  }

  getExistingUser(id:any){
   this.api.getEmployeeAPI(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.Employee=res
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
   })
  }

  updateEmployee(id:any){
    this.api.updateEmployeeAPI(id,this.Employee).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          title: 'Yess',
          text: 'Employee Updated Succefully',
          icon: 'success'
        })
        this.router.navigateByUrl('employee')
        
      }
    })
  }
}
