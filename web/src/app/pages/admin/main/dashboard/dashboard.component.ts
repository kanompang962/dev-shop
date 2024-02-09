import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  ApexAxisChartSeries, 
  ApexDataLabels, 
  ApexFill, 
  ApexLegend, 
  ApexPlotOptions, 
  ApexStroke, 
  ApexXAxis, 
  ApexYAxis, 
  ChartComponent,  
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart } 
from "ng-apexcharts";

import { UnitService } from 'src/app/services/unit.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
};

export type GraphOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  colors: string[];
  fill: ApexFill;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  @ViewChild("chart") chart: ChartComponent | undefined;
  chartOptions: Partial<ChartOptions> = {};
  graphOptions: Partial<GraphOptions> = {};

  constructor(
    private unitService:UnitService
  ) {
    
   }

  currentProduct = 0;
  currentUser = 0;

  ngOnInit(): void {
    this.fetchUnit();
    this.initPieChart();
    this.initGraphChart();
  }

  fetchUnit(): void {
    this.unitService.getUnit().subscribe((res)=> {
      this.currentProduct = res.data.product
      this.currentUser = res.data.user
    })
  }

  initPieChart(): void {
    this.chartOptions = {
      series: [50, 15, 35],
      chart: {
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C"],
      colors: ["#C8B8E1", "#000", "#07a44b2b"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            },
          }
        }
      ]
    };
  }

  initGraphChart(): void {
    this.graphOptions = {
      series: [
        {
          name: "Q1 Budget",
          group: "budget",
          data: [44000, 55000, 41000, 67000, 22000, 43000]
        },
        {
          name: "Q1 Actual",
          group: "actual",
          data: [48000, 50000, 40000, 65000, 25000, 40000]
        },
        // {
        //   name: "Q2 Budget",
        //   group: "budget",
        //   data: [13000, 36000, 20000, 8000, 13000, 27000]
        // },
        // {
        //   name: "Q2 Actual",
        //   group: "actual",
        //   data: [20000, 40000, 25000, 10000, 12000, 28000]
        // }
      ],
      chart: {
        type: "bar",
        height: 400,
        stacked: true
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      dataLabels: {
        formatter: (val) => {
          return Number(val) / 1000 + "K";
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        categories: [
          "Online advertising",
          "Sales Training",
          "Print advertising",
          "Catalogs",
          "Meetings",
          "Public relations"
        ]
      },
      fill: {
        opacity: 1
      },
      colors: ["#000", "#C8B8E1", "#80f1cb", "#00E396"],
      yaxis: {
        labels: {
          formatter: (val) => {
            return val / 1000 + "K";
          }
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "left"
      }
    };
  }
}
