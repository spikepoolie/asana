import { any } from 'codelyzer/util/function';
export class Filterutils {
  static genericFilterOperation(json: any, selectedItemsGender: any, selectedItemsBreed: any, filterType: string, originalJson: any) {
    const itemsSelected = [];
    let filtered = {};

    if (selectedItemsGender.length > 0) {
      selectedItemsGender.forEach(element => {
        itemsSelected.push(element.itemName);
      });

      filtered = json.filter(
        function (e) {
          return this.indexOf(e.gender) >= 0;
        },
        itemsSelected
      );
      json = filtered;
    }
    if (selectedItemsBreed.length > 0) {
      selectedItemsBreed.forEach(element => {
        itemsSelected.push(element.itemName);
      });

      filtered = json.filter(
        function (e) {
          return this.indexOf(e.breed) >= 0;
        },
        itemsSelected
      );
      json = filtered;
    }
    return filtered;
  }
  // if(selectedItemsGender.length === 0 && selectedItemsBreed.length === 0) {
  //   return originalJson;
  // }
}
