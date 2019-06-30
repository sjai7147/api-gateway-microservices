import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { AutocompleteItem } from '../autocomplete-item';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.page.html',
  styleUrls: ['./autocomplete.page.scss'],
})
export class AutocompletePage implements OnInit {
 public items:  Array<AutocompleteItem>=new Array<AutocompleteItem>();
 @ViewChild('autoInput', {read: ElementRef,static:true}) autoInput:ElementRef;
 @Output()selectedValue:EventEmitter<AutocompleteItem>=new EventEmitter<AutocompleteItem>();
 private currentFocus:number=0;
  constructor() { 
    this.items=[];
  }

  ngOnInit() {
  }
  fillAutocomplete(){

  }
  inputString(e:any){   
    var val=e.value;
      //call the service and fill autocomplete
      this.items=[{name:'abc'},{name:'abcd'},{name:'abcde'},{name:'abcdef'}];
    
  }
  listClick(e:any){
    this.autoInput.nativeElement.value=e.currentTarget.innerHTML;
    this.selectedValue.next({name:e.currentTarget.innerHTML});
    this.closeAllLists();
  }
  inputOnKeyDown(e:any) {
    //var x = document.getElementById(this.id + "autocomplete-list");
    var x = document.getElementById("autocomplete-list");
    var divs;
    if (x) divs = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      this.currentFocus++;
      /*and and make the current item more visible:*/
      this.addActive(divs);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      this.currentFocus--;
      /*and and make the current item more visible:*/
      this.addActive(divs);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (this.currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (divs) divs[this.currentFocus].click();
      }
      this.selectedValue.next({name:'abc'});
    }
}
   addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    this.removeActive(x);
    if (this.currentFocus >= x.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[this.currentFocus].classList.add("autocomplete-active");
  }
   removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
   closeAllLists() {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items")[0].childNodes;
    const len=x.length;
    for (var i = 1; i < len; i++) {
     // if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    //}
  }
  }

}
