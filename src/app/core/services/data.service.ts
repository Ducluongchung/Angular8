import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // get api
  get(uri: string) {
    return null;
  }

  // post api
  post(uri: string, data?: any) {
    return null;
  }

  // put api
  put(uri: string, data?: any) {
    return null;
  }

  // delete api
  delete(uri: string, key: string, id: string) {
    return null;
  }

  // post file api
  postFile(uri: string, data?: any) {

  }
}
