import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../employee.modal';
import { ApiServiceService } from '../services/api-service.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  allEmployees: EmployeeModel[] = []
  adminTime:any = new Date
  searchKey:string=""
  p: number = 1;
  constructor(private api: ApiServiceService) { }


  // same effect that of useEffect for loading page
  ngOnInit(): void {
  this.getAllEmployee()
  }


  getAllEmployee() {
    this.api.getAllEmplyeeAPI().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allEmployees=res

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }


  sortId(){
    this.allEmployees.sort((a:any,b:any)=>a.id-b.id)
  }

  //localeCompare()-method tp compare 2 string 
  // return - -1,1,0 (for before, after,equal)
  // syntax
  sortName(){
    this.allEmployees.sort((a:any,b:any)=>a.username.localeCompare(b.username))
  }


  //method to generate pdf
  generatePDf(){
    const pdf = new jsPDF()

   let head=[['Employee Id','Employee name','Email','Status']]

   let body:any=[]

   this.allEmployees.forEach(item=>{
    body.push([item.id, item.username, item.email, item.status])
   })


   // to set a font size to the table
   pdf.setFontSize(16)

   //heading
   pdf.text('Employee Details',60,10) // text('title', position from left , position from right)

   // generate
autoTable(pdf,{head,body})

//to open a table in new tab
pdf.output('dataurlnewwindow')

// name of pdf
pdf.save('EmployeeDetails.pdf')

  }

  // method to delete employee details
  deleteEmployee(id:any){
    this.api.deleteEmployeeAPI(id).subscribe({
      next:(res:any)=>{console.log(res);
        Swal.fire({
          title: 'Ooops',
          text: 'Deleted Employee Details',
          icon: 'warning'
        })
        this.getAllEmployee()
      },
      error:(err:any)=>{console.log(err);
      }
    })
  }

}
