import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators, FormControl} from '@angular/forms';
import { PersonDetail} from '../../core/models/personDetail';
import { ImageUpload } from '../../core/services/ImageUpload';
import { PersonService } from 'src/app/core/services/person.service';
import { VillageService } from 'src/app/core/services/village.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',  
  styleUrls: ['./person-add-edit.component.scss'],
})
export class PersonAddEditComponent implements OnInit {
 
  @ViewChild('imgperson',{read:{},static:true})
  personImage : HTMLElement;

  public villageList:any[];
  public persons:any[];
  selectedValue:any; 
  public imageSrc:string="../../../assets/images/shiv-parvati.jpg";
  public searchTerm:FormControl= new FormControl();
  public personForm:FormGroup;
  public submitted:boolean=false;
  public personDetails:PersonDetail={personId:null,parentId:null,name:'',dateOfBirth:new Date(),marriageDate:null,
  'liveTill':null,'relationId':null,'sex':null,'villageId':null,'shortDesc':''};
  constructor(private formBuilder:FormBuilder,private imageUpload:ImageUpload,private personService:PersonService,private villageService:VillageService) { }

  ngOnInit() {
    this.personForm=this.formBuilder.group({
      'personId':[this.personDetails.personId,Validators.required],
      'parentId':[this.personDetails.parentId,Validators.required],
      'name':[this.personDetails.name,Validators.required],
      'dateOfBirth':[this.personDetails.dateOfBirth,Validators.required],
      'marriageDate':[this.personDetails.marriageDate],
      'liveTill':[this.personDetails.liveTill],
      'relationId':[this.personDetails.relationId,Validators.required],
      'sex':[this.personDetails.sex,Validators.required],
      'villageId':[this.personDetails.villageId,Validators.required],
      'shortDesc':[this.personDetails.shortDesc]      
    })


    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '') {
          let villageId=this.f.villageId.value||0;
          this.personService.search(term,villageId).subscribe(
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
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent,val:any) {
    this.f.parentId= new FormControl(event.option.value.personId);
   
  }
  displayFn(user: any): string {
    return user ? user.name : '';
  }

  get f() { return this.personForm.controls; }

    onSubmit() {
        this.submitted = true;
        const result: PersonDetail = Object.assign({'image':this.imageSrc}, this.personForm.value);
        //result.personalData = Object.assign({}, result);
        // stop here if form is invalid
        if (this.personForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.personForm.value))
    }

    uploadFile(ctrl:HTMLElement){
      this.imageSrc='';
      this.imageUpload.preview(ctrl['files']).then(res=>{
       this.imageSrc=res as string;      
      }).catch(error=>{
        console.log(error as string);
      });
    }

}
