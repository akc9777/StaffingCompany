import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private api: WebApiService) { }

  addAssignment(json: any): Observable<any> {
    return this.api.post('assignment/addassignment', json);
  }

  editAssignment(json: any): Observable<any> {
    return this.api.put('assignment/editassignment', json);
  }

  markAssignmentComplete(json: any): Observable<any> {
    return this.api.put('assignment/MarkAssignmentAsComplete', json);
  }

  getAssignment(id: any) {
    return this.api.get('assignment/getassignment', JSON.stringify({ assignmentId: id }));
  }

  getAllAssignment() {
    return this.api.get('assignment/getallassignment');
  }

}
