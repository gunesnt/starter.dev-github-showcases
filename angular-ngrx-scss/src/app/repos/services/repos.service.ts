import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReposService {

  constructor(private http: HttpClient) { }

  getTopRepos(): Observable<any> {
    return this.http.get<any>(`${environment.githubUrl}/users/${}/repos?sort=updated&affiliation=owner,collaborator,organization_member&per_page=20`).pipe(
      map((data) => ({
      })),
    );
  }
}
