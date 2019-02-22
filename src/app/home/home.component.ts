import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  breedsAE: Array<String>;
  breedsFL: Array<String>;
  breedsMS: Array<String>;
  breedsTZ: Array<String>;
  allBreeds: Object;
  subBreeds: Array<String>;
  randomDog: Object;
  placeHolders: ['A - E', 'F - L', 'M - S', 'T - Z'];
  selectedBreed = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAllBreeds().subscribe(data => {
      if (data['status'] === 'success') {
        this.allBreeds = data['message'];
        const breedNames = Object.keys(this.allBreeds);
        const breedsAE = [];
        const breedsFL = [];
        const breedsMS = [];
        const breedsTZ = [];
        breedNames.forEach(name => {
          if (name[0].match(/[a-e]/i)) {
            breedsAE.push(this.capitalize(name));
          }
          if (name[0].match(/[f-l]/i)) {
            breedsFL.push(this.capitalize(name));
          }
          if (name[0].match(/[m-s]/i)) {
            breedsMS.push(this.capitalize(name));
          }
          if (name[0].match(/[t-z]/i)) {
            breedsTZ.push(this.capitalize(name));
          }
        });
        this.breedsAE = breedsAE;
        this.breedsFL = breedsFL;
        this.breedsMS = breedsMS;
        this.breedsTZ = breedsTZ;
      }
    });
  }

  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getNewImage() {
    const selectedBreed = this.selectedBreed;
    if (selectedBreed) {
      this.api
        .getRandomByBreed(selectedBreed.toLocaleLowerCase())
        .subscribe(data => {
          this.randomDog = data;
        });
    }
  }

  breedSelected(value: string) {
    if (value) {
      this.selectedBreed = value;
      const nameToLower = value.toLocaleLowerCase();
      this.subBreeds = this.allBreeds[nameToLower];
      this.api.getRandomByBreed(nameToLower).subscribe(data => {
        this.randomDog = data;
      });
    }
  }
}
