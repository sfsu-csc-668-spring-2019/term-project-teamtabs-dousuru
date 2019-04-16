import { NgModule } from "@angular/core";

import { ApiTestComponent } from "./api-test/api-test.component";
import { NetworkTestingComponent } from "./network-testing.component";

import { SocketTestComponent } from "./socket-test/socket-test.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "apitest",
    component: NetworkTestingComponent,
    children: [
      { path: "", redirectTo: "http", pathMatch: "full" },
      { path: "http", component: ApiTestComponent },
      { path: "sockets", component: SocketTestComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class NetworkTestingRoutingModule {}
