import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {ElTreeModule} from "element-angular/release/tree/module";
import {ElButtonsModule} from "element-angular/release/button/module";
import { HeroesComponent } from './list-cluster/list-cluster.component';
import {FormsModule} from "@angular/forms";
import {CmdbNsComponent} from "./list-namespace/list-namespace.component";
import {ElRowModule} from "element-angular/release/row/module";
import {ElColModule} from "element-angular/release/col/module";
import {CmdbDeployComponent} from "./list-deploy/list-deploy.component";
import {ElMenusModule} from "element-angular/release/menu/module";
import {ElTableModule} from "element-angular/release/table/module";
import {ResourceComponent} from "./resource/list-resource.component";
import {DetailResourceComponent} from "./resource-detail/detail-resource.component";

@NgModule({
  declarations: [
    ResourceComponent,
    DetailResourceComponent,
    // AppComponent
//...
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ElTreeModule,
    ElButtonsModule,
    FormsModule,
    ElRowModule,
    ElColModule,
    ElMenusModule,
    ElTableModule,
//...
  ],
  providers: [],
  exports: [
    ResourceComponent,
    DetailResourceComponent
  ],
  bootstrap: []
})
export class Cmdb02Module { }
