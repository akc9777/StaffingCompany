import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private api: WebApiService) { }

  addOrganization(json: any): Observable<any> {
    return this.api.post('organization/addorganization', json);
  }

  editOrganization(json: any): Observable<any> {
    return this.api.put('organization/editorganization', json);
  }

  getOrganization(id: any) {
    return this.api.get('organization/getorganization', JSON.stringify({ organizationId: id }));
  }

  getAllOrganization() {
    return this.api.get('organization/getallorganization');
  }

}
