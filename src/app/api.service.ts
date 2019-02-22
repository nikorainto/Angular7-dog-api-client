import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllBreeds() {
    return this.http.get('https://dog.ceo/api/breeds/list/all');
  }

  getRandom() {
    return this.http.get('https://dog.ceo/api/breeds/image/random');
  }

  getRandomByBreed(breed: string) {
    return this.http.get(`https://dog.ceo/api/breed/${breed}/images/random`);
  }
}
