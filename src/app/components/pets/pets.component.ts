import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import DogsJson from '../../../assets/data/dogs.json';
@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})


export class PetsComponent implements OnInit {
  dogsJson = [];
  dogImageUrl = '';
  dogsImageUrl = [];
  dogName = '';


  @ViewChild('basicModal') public basicModal: ModalDirective;
  public isModalShown = false;

  constructor() {
    this.dogsJson = DogsJson.dogs;
    // this.dogsJson.forEach(element => {
    //   console.log(element);
    // });
    for (let i = 0; i < this.dogsJson.length; i++) {
      const url = this.dogsJson[i].image;
      this.dogsImageUrl[i] = {
        url: url,
        show: false,
        alt: this.dogsJson[i].name,
        name: this.dogsJson[i].name,
        breed: this.dogsJson[i].breed,
        gender: this.dogsJson[i].gender,
        dogid: i
      };
    }
   }

  ngOnInit() {}

  showDogModal(img, dognameselected) {
    this.dogImageUrl = img;
    this.dogName = dognameselected;
    document.getElementById('modal01').style.display = 'block';

  }

  trackByFn(index, item) {
    return index; // or item.id
  }

 HideModal() {
   document.getElementById('modal01').style.display = 'none';
 }


}
