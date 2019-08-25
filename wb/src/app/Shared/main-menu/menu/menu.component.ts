import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {  
  @Input() Items;
  @Input() MenuType;
  @Output() MenuClick: EventEmitter<object> =new EventEmitter<object>();
  
  constructor() {
    console.log('Menu constructor');
   }

  ngOnInit() {
    console.dir(this.Items);
  }
  
  onMenuClick(name:string,childCount:number){
    this.Items.open=!this.Items.open;
    this.MenuClick.next({"name":name});
  }

}
