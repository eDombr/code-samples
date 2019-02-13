import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { BaseService } from '../../shared/base/base.service';
import { Theme } from '../../admin/themes/theme.interface';


@Injectable()
export class ThemeService extends BaseService {

  public constructor(protected http: HttpClient) {
    super();
  }

  public get(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.baseUrl}/themes`);
  }

  public create(theme: Theme, file: File): Observable<Theme> {
    const body: FormData = new FormData();
    body.append('file', file);
    body.append('theme', JSON.stringify(theme));

    return this.http.post<Theme>(`${this.baseUrl}/themes`, body);
  }

  public update(theme: Theme, file: File): Observable<Theme> {
    const body: FormData = new FormData();
    body.append('file', file);
    body.append('theme', JSON.stringify(theme));

    return this.http.put<Theme>(`${this.baseUrl}/themes`, body);
  }

  public filter(keyword: string): Observable<Theme[]> {
    const options = keyword ? {
      params: new HttpParams().set('keyword', keyword)
    } : {};

    return this.http.get<Theme[]>(`${this.baseUrl}/themes/filter`, options)
  }

  public getById(id: number): Observable<Theme> {
    return this.http.get<Theme>(`${this.baseUrl}/themes/${id}`);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/themes/${id}`);
  }

  public import(file: File) {
    const body: FormData = new FormData();
    body.append('file', file);

    return this.http.post(`${this.baseUrl}/themes/import`, body);
  }
}
