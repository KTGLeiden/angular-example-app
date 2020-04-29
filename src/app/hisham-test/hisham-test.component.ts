import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hisham-test',
  templateUrl: './hisham-test.component.html',
  styleUrls: ['./hisham-test.component.css'],
})
export class HishamTestComponent implements OnInit {
  public hishamCars = ['Tesla', 'BMW', 'Mercedes', 'Renault', 'Porsche'];
  public dateExample = new Date();
  public currencyExample = 35085.82;

  constructor() {}

  ngOnInit(): void {}

  public updateTime() {
    this.dateExample = new Date();
  }
}
