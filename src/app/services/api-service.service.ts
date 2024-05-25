import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../employee.modal';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  serverUrl ='https://employee-details-q9dy.onrender.com'

  constructor(private http:HttpClient) { }
  loginAPI(){
    return this.http.get(`${this.serverUrl}/Employees/0`)
  }


  // to add employees
  addEmployeeAPI(employee:EmployeeModel){
  return  this.http.post(`${this.serverUrl}/Employees`,employee)
  }


// api to get all employee details
getAllEmplyeeAPI(){
  return this.http.get(`${this.serverUrl}/Employees`)
}


// api to delete an employee
deleteEmployeeAPI(id:any){
  return this.http.delete(`${this.serverUrl}/Employees/${id}`)
}


// api to get a details of a particular employee
getEmployeeAPI(id:any){
  return this.http.get(`${this.serverUrl}/Employees/${id}`)
}

// api to update a  particular employee
updateEmployeeAPI(id:any,body:any){
return this.http.put(`${this.serverUrl}/Employees/${id}`,body)
}

// api to update a  admin
updateAdminAPI(body:any){
  return this.http.put(`${this.serverUrl}/Employees/0`,body)
}

}
