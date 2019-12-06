import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'tekton-logs',
  templateUrl: 'tekton-logs.component.html',
  styleUrls: ['tekton-logs.component.scss']
})

export class PodLogsComponent implements OnInit, OnDestroy {
  iframe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    console.log("enter tekton-dashboard")
    let src = "http://tekton.ee.souche-inc.com/";
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(src);

  }

  ngOnDestroy(): void {
  }
}
