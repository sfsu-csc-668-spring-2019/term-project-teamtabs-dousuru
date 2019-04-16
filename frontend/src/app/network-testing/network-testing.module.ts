import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "./api.service";
import { ApiTestComponent } from "./api-test/api-test.component";
import { NetworkTestingComponent } from "./network-testing.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SocketTestComponent } from "./socket-test/socket-test.component";
import { NetworkTestingRoutingModule } from "./network-testing-routing.module";

@NgModule({
  declarations: [
    ApiTestComponent,
    NetworkTestingComponent,
    SocketTestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NetworkTestingRoutingModule
  ],
  providers: [ApiService],
  exports: [NetworkTestingComponent, ApiTestComponent, SocketTestComponent]
})
export class NetworkTestingModule {}
