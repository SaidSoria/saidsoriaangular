import { Component } from '@angular/core';
import { ServicesService } from './services/services.service';

const colors = ['red', 'blue', 'green', 'yellow', 'black'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public data;
  public principalKeys = []; // An array with Alphavantage object keys
  public tableTitles = [];
  public metaData = {}; // Object with principal info
  public metaKeys = []; // An array with Meta Data keys
  public timeSeries = {}; // Object with Time Series (Daily) Info
  public timeKeys = [];
  // chart important config
  public chartType;
  public chartData;
  public chartOptions;
  public allData = []; // An array with all data that must be displayed on chart, also have background color and label
  public charType = ['bar', 'radar', 'line'];
  public selectedCharType = 'bar';

  constructor(
    private service: ServicesService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  /**
   * Calling getInfo Service to get Alphavantage API data
   */
  async getInfo() {
    // 
    this.data = await this.service.getInfo();
    if (this.data) {
      this.setValues();
      this.chartInit();
    }
  }

  /**
   * Setting principal values that are used for showing data on list, charts and table.
   */
  setValues() {
    this.principalKeys = this.getKeys(this.data);
    this.metaData = this.data[this.principalKeys[0]];
    this.metaKeys = this.getKeys(this.metaData);
    this.timeSeries = this.data[this.principalKeys[1]];
    this.timeKeys = this.getKeys(this.timeSeries);
    // Returns an array of a given object's own enumerable property values
    this.tableTitles = Object.values(this.timeSeries);
    this.setChartData();
  }

  /**
   * Filling allData array
   */
  setChartData() {
    const chartLabels = this.getKeys(this.tableTitles[0]);
    chartLabels.forEach((label, index) => {
      let auxData = [];
      this.tableTitles.forEach(element => {
        auxData.push(element[label])
      });
      this.allData.push({
        label: `${chartLabels[index]}`,
        data: auxData,
        backgroundColor: colors[index]
      });
    });
  }

  /**
   * Chart initialization
   */
  chartInit() {
    this.chartData = {
      labels: this.timeKeys,
      datasets: this.allData
    };
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true
    };
  }

  /**
   * Returns an array of a given object's own enumerable property names
   * @param obj 
   */
  getKeys(obj: Object): Array<string> {
    return Object.keys(obj);
  }
}
