import { Component, OnInit } from '@angular/core';
import { PersonService } from '../Core/Services/person.service';
import { Observable } from 'rxjs';
import { Person } from '../Core/Model/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  public personList:Observable<Person>;
  
  constructor(private objperson:PersonService) { }

  ngOnInit() {
  }

}
