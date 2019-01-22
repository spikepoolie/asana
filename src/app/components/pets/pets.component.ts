import { BaseService } from './../../services/base.service';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  dropdownListBreed = [];
  selectedItemsBreed = [];
  dropdownSettingsBreed = {};
  dropdownListGender = [];
  selectedItemsGender = [];
  dropdownSettingsGender = {};
  dogs_breed = [];
  dogs_gender = [];
  response: any = [];
  @Input() filterBy = 'all';


  constructor(private rest: BaseService) {}

  ngOnInit() {

    this.dogsJson = DogsJson.dogs;

    this.displayDogs(this.dogsJson, true);

    this.getLocation();
    this.selectedItemsBreed = [];
    this.selectedItemsGender = [];

    this.dropdownSettingsBreed = {
        singleSelection: false,
        text: 'Select breeds',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableSearchFilter: true,
        classes: 'pets'
      };

    this.dropdownSettingsGender = {
      singleSelection: false,
      text: 'Select gender',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: 'pets'
    };

    this.rest.getGoogleMapKey().subscribe((data: {}) => {
      this.response = data;
    });
  }


  onItemSelectBreed(item: any) {

  }
  onItemDeSelectBreed(item: any) {

  }
  onSelectAllBreed(items: any) {
 
  }
  onDeSelectAllBreed(items: any) {
   
  }

  onItemSelectGender(item: object) {
    this.dogsJson = DogsJson.dogs;
    const gendersSelected = [];
    this.selectedItemsGender.forEach(element => {
      gendersSelected.push(element.itemName);
    });

    const filtered = this.dogsJson.filter(
      function (e) {
        return this.indexOf(e.gender) >= 0;
      },
      gendersSelected
    );
    this.displayDogs(filtered, false);
  }

  onItemDeSelectGender(item: any) {
    this.dogsJson = DogsJson.dogs;
    let filtered = [];
    const gendersSelected = [];
    if (this.selectedItemsGender.length > 0) {
      this.selectedItemsGender.forEach(element => {
        gendersSelected.push(element.itemName);
      });

      filtered = this.dogsJson.filter(
        function (e) {
          return this.indexOf(e.gender) >= 0;
        },
        gendersSelected
      );
    } else {
      filtered = this.dogsJson;
    }
    this.displayDogs(filtered, false);
  }
  onSelectAllGender(items: any) {
    this.displayDogs(DogsJson.dogs, false);
  }
  onDeSelectAllGender(items: any) {
  }

  displayDogs = (dogs_feed, rebuildFilters) => {
    if (!rebuildFilters) {
      this.dogsImageUrl = [];
    }

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

    if ( rebuildFilters) {
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
}
