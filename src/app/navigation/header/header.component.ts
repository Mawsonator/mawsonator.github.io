import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'calc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {

  title = 'Matthew Mawson';
  @Output() public sidenavToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
}
