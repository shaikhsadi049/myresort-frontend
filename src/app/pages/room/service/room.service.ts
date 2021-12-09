import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const resortUrl = 'http://localhost:3000/api/resort';
const roomUrl = 'http://localhost:3000/api/rooms';

@Injectable()
export class RoomService {
  constructor(private http: HttpClient) {}

  roomAdd(arr: any): Observable<any> {
    return this.http.post(`${roomUrl}/add`, arr);
  }
}
