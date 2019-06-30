import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PersonService} from '../core/services/person.service';
import { VillageService} from '../core/services/village.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
declare var Charts: any;
@Component({
  selector: 'app-sajara',
  templateUrl: './sajara.page.html',
  styleUrls: ['./sajara.page.scss'],
})
export class SajaraPage implements OnInit {

  selectedValue:any;
  searchTerm : FormControl = new FormControl();
  config:{}= {
      container: "#custom-colored",

      nodeAlign: "BOTTOM",
      
      connectors: {
          type: 'step'
      },
      node: {
          HTMLclass: 'nodeExample1'
      }
    };
  constructor(private personService:PersonService,private villageService:VillageService) { }
  
  public persons:any[];
  public villageList:any[];
  ngOnInit() {
    
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.personService.search(term).subscribe(
            data => {
              this.persons = data as any[];
              //console.log(data[0].BookName);
          })
        }
    });
    //village
    this.villageService.GetVillages().subscribe(v=>{
      this.villageList=v;
    });
    // this.loadChart( window['chart_config']);
  }

  loadChart(chartJson){
    Charts.createData(chartJson,'#custom-colored');
    Charts.plotGraph();
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent,val:any) {
    this.personService.getPersonHierarchy(event.option.value.personId)
    .subscribe(h=>{
      this.loadChart(h);
      //let personObj= this.craeteObj(h);
      //this.loadChart(personObj);
    })
  }
  displayFn(user: any): string {
    return user ? user.name : '';
  }


  private craeteObj(data){
   let PersonHie:{}=new Object();
   let chartData:any[]=[]; chartData.push(this.config)
    for(var i=0;i<data.length;i++){
      PersonHie[data[i]['personId']]=data[i];
    }
    for(let d in PersonHie){   
      let tmp:{}=new Object();  tmp['text']={};
      for(let p in PersonHie[d]){
        if("parentId".indexOf(p)!==-1){
          tmp[p]=PersonHie[d][p];
          PersonHie[PersonHie[d][p]]&&(tmp['parent']=PersonHie[PersonHie[d][p]]);
        }
       else if("personId imagePath".indexOf(p)!==-1){
          tmp[p]=PersonHie[d][p];
        }else{
          tmp['text'][p]=PersonHie[d][p];
        }
      }
      chartData.push(tmp);
    }
    return chartData;
  }
}
