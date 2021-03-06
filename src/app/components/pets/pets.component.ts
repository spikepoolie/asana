
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../services/base.service';
import { Filterutils } from './../../utils/filterutils';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { Router } from '@angular/router';


// importing local json instead of using http call
//import DogsJson from '../../../assets/data/dogs.json';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})

export class PetsComponent implements OnInit {

  // global declarations

  dogsJson = [];
  dogsJsonOriginal = [];
  dogImageUrl = '';
  dogsImageUrl = [];
  data: any = [];
  dogItem: any;
  dogName = '';
  address = '';
  geoLocationErrorMessage = '';
  nearByLocation;
  dropdownListBreed = [];
  selectedItemsBreed = [];
  dropdownSettingsBreed = {};
  dropdownListGender = [];
  selectedItemsGender = [];
  dropdownSettingsGender = {};
  dogs_breed = [];
  dogs_gender = [];
  response: any = [];

  constructor(private router: Router, public baseService: BaseService, private http: HttpClient) { }

  getData(): any {
    return this.baseService.serviceData;
  }
  setData(value: any) {
    this.baseService.serviceData = value;
  }

  ngOnInit() {
    this.http.get('https://www.goemobile.com/asana/assets/data/dogs.json')
      .subscribe(
        data => {
          this.data = { ...data };
          this.dogsJson = this.data.dogs;
          this.dogsJsonOriginal = this.data.dogs;
          this.displayDogs(this.dogsJson, true);
        }
      );



    // this.dogsJson = DogsJson.dogs;
    // this.dogsJsonOriginal = DogsJson.dogs;

    // this.displayDogs(this.dogsJson, true);

    // Geolocation based on the user location
    this.getLocation();
    this.selectedItemsBreed = [];
    this.selectedItemsGender = [];


    // breed filter
    this.dropdownSettingsBreed = {
      singleSelection: false,
      text: 'Select breeds',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'pets'
    };

    // gender filter
    this.dropdownSettingsGender = {
      singleSelection: false,
      text: 'Select gender',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: 'pets'
    };
  }

  // based on the filters selections, display the filtered information
  onItemSelectBreed = (item: any) => {
    const dogsFiltered = Filterutils.genericFilterOperation(this.data.dogs, this.selectedItemsGender, this.selectedItemsBreed, 'breed', this.dogsJsonOriginal);
    this.displayDogs(dogsFiltered, false);
  }

  onItemDeSelectBreed = (item: any) => {
    const dogsFiltered = Filterutils.genericFilterOperation(this.data.dogs, this.selectedItemsGender, this.selectedItemsBreed, 'breed', this.dogsJsonOriginal);
    this.displayDogs(dogsFiltered, false);
  }

  onSelectAllBreed(items: any) {
    const dogsFiltered = Filterutils.genericFilterOperation(this.data.dogs, this.selectedItemsGender, this.selectedItemsBreed, 'breed', this.dogsJsonOriginal);
    this.displayDogs(dogsFiltered, false);
  }

  onDeSelectAllBreed(items: any) {
    const dogsFiltered = Filterutils.genericFilterOperation(this.data.dogs, this.selectedItemsGender, this.selectedItemsBreed, 'breed', this.dogsJsonOriginal);
    this.displayDogs(dogsFiltered, false);
   }

  onItemSelectGender = (item: any) => {
    const dogsFiltered = Filterutils.genericFilterOperation(this.data.dogs, this.selectedItemsGender, this.selectedItemsBreed, 'gender', this.dogsJsonOriginal);
      this.displayDogs(dogsFiltered, false);
  }

  onItemDeSelectGender = (item: any) => {
    if (this.dropdownListGender.length === this.selectedItemsGender.length) {
      this.displayDogs(this.dogsJsonOriginal, false);
    } else {
      if ( this.selectedItemsGender.length > 0) {
        const dogsFiltered = Filterutils.genericFilterOperation(this.data.dogs, this.selectedItemsGender, this.selectedItemsBreed, 'gender', this.dogsJsonOriginal);
        this.displayDogs(dogsFiltered, false);
     } else {
        if (this.data.dogs.length === 0) {
         this.displayDogs(this.dogsJsonOriginal, false);
       } else {
          this.displayDogs(this.data.dogs, false);
       }
     }
    }
  }

  onSelectAllGender = (items: object) => this.displayDogs(this.dogsJsonOriginal, false);

  onDeSelectAllGender = (items: object) => {};

  displayDogs = (dogs_feed, rebuildFilters) => {
    if (!rebuildFilters) {
      this.dogsImageUrl = [];
    }

    // Build filters drop downs

    for (let i = 0; i < dogs_feed.length; i++) {
      const url = dogs_feed[i].image;
      this.dogsImageUrl[i] = {
        url: url,
        show: false,
        alt: dogs_feed[i].name,
        name: dogs_feed[i].name,
        breed: dogs_feed[i].breed,
        gender: dogs_feed[i].gender,
        dogid: i
      };

      const breed = dogs_feed[i].breed;
      this.dogs_breed.push(breed);
      const gender = dogs_feed[i].gender;
      this.dogs_gender.push(gender);
    }

    if (rebuildFilters) {
      const uniqBreed = [...new Set(this.dogs_breed)];
      const uniqGender = [...new Set(this.dogs_gender)];
      this.populateDogsBreed(uniqBreed);
      this.populateDogsGender(uniqGender);
    }
  }

  populateDogsBreed = (data) => {
    let breedObj = {};
    for (let i = 0; i < data.length; i++) {
      breedObj = { 'id': i, 'itemName': data[i] };
      this.dropdownListBreed.push(breedObj);
    }
  }
  populateDogsGender = (data) => {
    let genderObj = {};
    for (let i = 0; i < data.length; i++) {
      genderObj = { 'id': i, 'itemName': data[i] };
      this.dropdownListGender.push(genderObj);
    }
  }

  showDogModal = ( item) => {
    this.dogImageUrl = item.url;
    this.dogItem = item;
    this.dogName = item.name;
    document.getElementById('modal01').style.display = 'block';
  }

  HideModal = (action) => {
    document.getElementById('modal01').style.display = 'none';
    if (action === 'adoption') {
      this.goToPets(this.dogItem);
    }
  }

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

  // get user coordenates and display city name and zip code
  showPosition = (position) => {

    const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };

    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&sensor=true&key=AIzaSyBipOsDkqD6koSbj2nEyMJjbx1u-hy1T_I`
    )
      .then(response => response.json())
      .then((p) => {
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

  goToPets = (petInfo: object) => {

    this.setData(petInfo);
    this.router.navigate(['/adoption']);
  }
}
