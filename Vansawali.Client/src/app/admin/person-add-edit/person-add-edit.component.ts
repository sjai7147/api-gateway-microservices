import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators, FormControl} from '@angular/forms';
import { PersonDetail} from '../../core/models/personDetail';
import { ImageUpload } from '../../core/services/ImageUpload';
import { PersonService } from 'src/app/core/services/person.service';
import { VillageService } from 'src/app/core/services/village.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { LocalStorage } from 'src/app/core/services/localStorage';

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
  public personDetails:PersonDetail={
    personId:null,parentId:null,name:'',
    dateOfBirth:new Date(),marriageDate:null,
  'liveTill':null,'relationId':null,
  'sex':null,'villageId':null,'shortDesc':''
};
  constructor(private formBuilder:FormBuilder,private imageUpload:ImageUpload,
    private personService:PersonService,private villageService:VillageService,
    private localStorage:LocalStorage) { }
    public message:string='';
  ngOnInit() {
    this.personForm=this.formBuilder.group({
      'personId':[this.personDetails.personId],
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

    this.personForm.valueChanges.subscribe((p)=>{
      this.submitted=false;
    });
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
    this.setDefault();
  }

  private setDefault() {
    let vId=this.localStorage.getFromStorage('villageId');
    vId &&
     ((this.personDetails.villageId=parseInt(vId))&& (this.personDetails.dateOfBirth= new Date()));     
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
        const result: PersonDetail = Object.assign({'imageString':this.imageSrc}, this.personForm.value);
        //result.personalData = Object.assign({}, result);
        // stop here if form is invalid
        if (this.personForm.invalid) {
            return;
        }
        this.localStorage.setToStorage('villageId',result.villageId); 
        this.personService.savePerson(result).subscribe((res)=>{
          this.personForm.reset({villageId:this.localStorage.getFromStorage('villageId'),dateOfBirth: new Date()});
          console.log('person save operation: '+res);
          this.setDefault();
          this.message='Person saved successfully';
          this.submitted=true;
        },(error)=>{
          console.log('error in person saving');
          this.message='Error in person saving';
          this.setDefault();
          this.submitted=true;
        })
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.personForm.value))
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
