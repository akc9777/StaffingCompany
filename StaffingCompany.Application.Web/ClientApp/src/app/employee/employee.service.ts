import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private api: WebApiService) { }

  addEmployee(json: any): Observable<any> {
    return this.api.post('employee/addemployee', json);
  }

  editEmployee(json: any): Observable<any> {
    return this.api.put('employee/editemployee', json);
  }

  getEmployee(id: any) {
    return this.api.get('employee/getemployee', JSON.stringify({ employeeId: id }));
  }

  getAllEmployee() {
    return this.api.get('employee/getallemployee');
  }
}
