import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TravelEntry } from 'src/app/api/dto/travelentry.dto';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  @Input()
  entries: Array<TravelEntry> = null;

  @Output()
  selectEntry = new EventEmitter<TravelEntry>();

  constructor() { }

  ngOnInit(): void {
  }

}
