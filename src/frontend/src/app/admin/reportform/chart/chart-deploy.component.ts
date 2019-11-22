import { Component, OnInit } from '@angular/core';
import { MessageHandlerService } from '../../../shared/message-handler/message-handler.service';
import { PublishService } from '../../../shared/client/v1/publish.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import * as moment from 'moment';
import { Chart } from 'chart.js'

const resourceType = {
  'Deployment': 0,
  'Service': 1,
  'ConfigMap': 2,
  'Secret': 3,
  'PersistentVolumeClaim': 4,
  'CronJob': 5,
  'StatefulSet': 6,
  'DaemonSet': 7,
  'Ingress': 8,
  'HPA': 9
};

@Component({
  selector: 'wayne-chart-deploy',
  styleUrls: ['./chart-deploy.component.scss'],
  templateUrl: './chart-deploy.component.html'
})
export class ChartDeployComponent implements OnInit {
  datas: any;
  all: "All";
  startTime: string;
  endTime: string;
  resourceName: string;
  cluster: string;
  user: string;
  rtype: string;
  resourceType = [
    {'name':'Deployment'},
    {'name':'Service'},
    {'name':'ConfigMap'},
    {'name':'Secret'},
    {'name':'PersistentVolumeClaim'},
    {'name':'CronJob'},
    {'name':'StatefulSet'},
    {'name':'DaemonSet'},
    {'name':'Ingress'},
    {'name':'HPA'}
  ];

  constructor(
    private messageHandlerService: MessageHandlerService,
    private publishService: PublishService) {
  }


  ngOnInit() {
    const now = new Date();
    this.startTime = moment(new Date(now.getTime() - 1000 * 3600 * 24 * 7)).format('MM/DD/YYYY');
    this.endTime = moment(now).format('MM/DD/YYYY');

  }

  search() {
    this.refresh();
  }

  chart(xdata: any, ydata: any) {
    console.log(xdata, ydata)
    var ctx = document.getElementById('deployChart');
    var deployChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xdata,
        datasets: [{
          label: '发布频率图(次/日)',
          data: ydata,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  }

  getType(rtype: string): number {
    return resourceType[rtype];
  }

  refresh(state?: ClrDatagridStateInterface) {
    this.publishService.getDeployChart(
      moment(this.startTime, 'MM/DD/YYYY', true).format('YYYY-MM-DDTHH:mm:SS') + 'Z',
      moment(this.endTime, 'MM/DD/YYYY', true).format('YYYY-MM-DDTHH:mm:SS') + 'Z',
      this.resourceName, this.cluster, this.user, this.getType(this.rtype)).
    subscribe(
      resp => {
        this.datas = resp.data;
        var xdata = new Array();
        var ydata = new Array();
        this.datas.forEach((value) => {
          xdata.push(value['x'].split('T')[0]);
          ydata.push(value['y']);
        });
        console.log(xdata, ydata);
        this.chart(xdata, ydata);
      },
      error => {
        this.messageHandlerService.handleError(error);
      }
    );
  }

}
