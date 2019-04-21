import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ResourcesService } from "src/app/networking/resources.service";
import { Organization } from "src/app/networking/Organization";

@Component({
  selector: "app-organization-list",
  templateUrl: "./organization-list.component.html",
  styleUrls: ["./organization-list.component.scss"]
})
export class OrganizationListComponent implements OnInit {
  organizations: Observable<Organization[]>;
  constructor(private resources: ResourcesService) {}

  ngOnInit() {
    this.organizations = this.resources.getOrganizations();
  }
}
