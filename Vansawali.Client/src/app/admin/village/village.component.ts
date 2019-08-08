import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VillageService} from '../../core/services/village.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss'],
})
export class VillageComponent implements OnInit {
  selectedValue:any;
  searchTerm : FormControl = new FormControl();
  villageName : FormControl = new FormControl();
  public villageList:any[];
  constructor(private villageService:VillageService) { }

  ngOnInit() {
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.villageService.villageSearch(term).subscribe(
            data => {
              this.villageList = data as any[];
              
          })
        }
    });
     //village
     this.villageService.GetVillages().subscribe(v=>{
      this.villageList=v;
    });
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent,val:any) {
   let selectedVilage=  event.option.value;
  }
  displayFn(vill: any): string {
    return vill ? vill.villageName : '';
  }

}
