import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'pod-monitor',
  templateUrl: 'pod-monitor.component.html',
  styleUrls: ['pod-monitor.component.scss']
})

export class PodMonitorComponent implements OnInit, OnDestroy {
  iframe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    console.log("enter monitor")
    let src = "https://play.grafana.org/";
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(src);

  }

  ngOnDestroy(): void {
  }
}
