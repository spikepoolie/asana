import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
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
  address = '';
  geoLocationErrorMessage = '';
  nearByLocation;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  constructor() {
    this.dogsJson = DogsJson.dogs;
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

  ngOnInit() {
    this.getLocation();

    this.dropdownList = [
      {'id': 1, 'itemName': 'India'},
      {'id': 2, 'itemName': 'Singapore'},
      {'id': 3, 'itemName': 'Australia'},
      {'id': 4, 'itemName': 'Canada'},
      {'id': 5, 'itemName': 'South Korea'},
      {'id': 6, 'itemName': 'Germany'},
      {'id': 7, 'itemName': 'France'},
      {'id': 8, 'itemName': 'Russia'},
      {'id': 9, 'itemName': 'Italy'},
      {'id': 10 ,'itemName': 'Sweden'}
    ];
  this.selectedItems = [
        {'id': 2, 'itemName': 'Singapore'},
        {'id': 3, 'itemName': 'Australia'},
        {'id': 4, 'itemName': 'Canada'},
        {'id': 5, 'itemName': 'South Korea'}
    ];

  this.dropdownSettings = {
          singleSelection: false,
          text: 'Select Countries',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          enableSearchFilter: true,
          classes: 'pets'
        };
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  showDogModal = (img, dognameselected) => {
    this.dogImageUrl = img;
    this.dogName = dognameselected;
    document.getElementById('modal01').style.display = 'block';
  }

  trackByFn = (index, item) => index;

    HideModal = () => document.getElementById('modal01').style.display = 'none';

   getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showMe, this.showError);
    } else {
      this.geoLocationErrorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  showMe = (position) => {
    const a = this.showPosition(position).then((json) => {
      this.nearByLocation = json;
    });
  }

  showPosition = (position) => {

    const latlng = { lat: position.coords.latitude, lng: position.coords.longitude};
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    return fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true&key=AIzaSyBipOsDkqD6koSbj2nEyMJjbx1u-hy1T_I'
    )
      .then(response => response.json())
      .then((p) => {
        console.log(p.results[0].address_components[6].long_name);
        const nearByLocaion = `${p.results[0].address_components[2].long_name} - ${p.results[0].address_components[6].long_name}`;
        return nearByLocaion;
      });
  }

  showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.geoLocationErrorMessage = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        this.geoLocationErrorMessage = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        this.geoLocationErrorMessage = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        this.geoLocationErrorMessage = 'An unknown error occurred.';
        break;
    }
  }
}
