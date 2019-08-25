import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Image } from 'src/app/Core/Model/image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

  @Input() image:Image;
  @Output() imageClick:EventEmitter<Image>=new EventEmitter<Image>();
  constructor() { }

  ngOnInit() {}
  onImageClick(){
    this.imageClick.next(this.image);
  }

}
