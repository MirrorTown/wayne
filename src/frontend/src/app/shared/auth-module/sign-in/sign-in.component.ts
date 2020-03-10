import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthoriseService } from '../../client/v1/auth.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LoginTokenKey } from '../../shared.const';
import * as particlesJS from 'particlesjs/dist/particles';
import {environment} from "../../../../environments/environment.hmr";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  version = require('../../../../../package.json').version;
  errMsg: string;
  username: string;
  password: string;
  isSubmitOnGoing: boolean;
  ngForm: NgForm;
  @ViewChild('ngForm', { static: true })
  currentForm: NgForm;

  constructor(private http: HttpClient,
              private authoriseService: AuthoriseService,
              private route: ActivatedRoute,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    particlesJS.init({
      selector: '.background',
      color: ['#DA0463', '#404B69', '#DBEDF3'],
      connectParticles: true
    });

    console.log("enter sign-in")
    const sid = this.route.snapshot.queryParams['sid'];
    const ref = this.route.snapshot.queryParams['ref'] ? this.route.snapshot.queryParams['ref'] : '/wayne';
    console.log(sid, ref)
    if (sid) {
      localStorage.setItem(LoginTokenKey, sid);
      console.log(ref)
      window.location.replace(ref);
    }
    if (this.authService.currentUser) {
      window.location.replace(ref);
    }
  }

  public get isValid(): boolean {
    return this.currentForm &&
      this.currentForm.valid &&
      !this.isSubmitOnGoing;
  }

  onSubmit() {
    if (this.isSubmitOnGoing) {
      return;
    }
    this.isSubmitOnGoing = true;
    let type = 'db';
    if (this.authService.config && this.authService.config.ldapLogin) {
      type = 'ldap';
    }
    this.authoriseService.Login(this.username, this.password, type).subscribe(
      resp => {
        const ref = this.route.snapshot.queryParams['ref'] ? this.route.snapshot.queryParams['ref'] : '/';
        const data = resp.data;
        localStorage.setItem(LoginTokenKey, data.token);
        window.location.replace(ref);
      },
      error => {
        this.isSubmitOnGoing = false;
        this.errMsg = error.error;
      }
    );

  }

  oauth2Login() {
    const currentUrl = document.location.origin;
    const ref = this.route.snapshot.queryParams['ref'] ? this.route.snapshot.queryParams['ref'] : '/';
    // this.http.get(`/wayne/currentbeare?next=${currentUrl}/wayne/sign-in?ref=${ref}`).toPromise().then((response: any) => {
    //   console.log("success os", response.data.token)
    //   // localStorage.setItem(LoginTokenKey, response.data.token);
    //   // window.location.replace("/wayne");
    // }).catch(error => {
    //   console.log("oauth2 error", error)
      // const currentUrl = document.location.origin;
      // const ref = this.route.snapshot.queryParams['ref'] ? this.route.snapshot.queryParams['ref'] : '/';
      window.location.replace(environment.url + `/wayne/login/oauth2/oauth2?next=${currentUrl}/wayne/sign-in?ref=${ref}`);
    // })
  }

  ssoLogin() {
    var config = require("config")
    const currentUrl = document.location.origin;
    const ref = this.route.snapshot.queryParams['ref'] ? this.route.snapshot.queryParams['ref'] : '/';
    window.location.replace(environment.url + `/wayne/login/sso/sso?next=${currentUrl}/wayne/sign-in?ref=${ref}`);
  }

  getOAuth2Title() {
    const oauth2Title = this.authService.config['system.oauth2-title'];
    return oauth2Title ? oauth2Title : 'OAuth 2.0 Login';
  }

  getSSOTitle() {
    const ssoTitile = this.authService.config['system.sso-title'];
    return ssoTitile ? ssoTitile : 'SSO Login';
  }

  getTitle() {
    // const imagePrefix = this.authService.config['system.title'];
    return 'SouChe';
  }

}
