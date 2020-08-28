import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() title;
  @Input() timeSeries;
  @Input() tableTitles;
  @Input() timeKeys;

  constructor() { }

  ngOnInit(): void {
  }

  getKeys(obj: Object): Array<string> {
    return Object.keys(obj);
  }
}
