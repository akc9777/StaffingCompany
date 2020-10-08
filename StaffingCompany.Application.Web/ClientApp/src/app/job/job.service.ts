import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private api: WebApiService) { }

  addJob(json: any): Observable<any> {
    return this.api.post('job/addjob', json);
  }

  editJob(json: any): Observable<any> {
    return this.api.put('job/editjob', json);
  }

  getJob(id: any) {
    return this.api.get('job/getjob', JSON.stringify({ jobId: id }));
  }

  getAllJob() {
    return this.api.get('job/getalljob');
  }

}
