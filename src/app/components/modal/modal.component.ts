import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() content: string = "";
  @Output() closeModalEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.closeModalEvent.emit();
  }

}
