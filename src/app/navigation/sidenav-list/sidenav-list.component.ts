import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'calc-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.scss'],
    standalone: false
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSidenavClose(){
    this.sidenavClose.emit();
  }
}
