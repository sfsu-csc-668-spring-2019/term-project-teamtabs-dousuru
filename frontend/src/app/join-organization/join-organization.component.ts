import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Organization } from "../models";
import { map, mergeAll } from "rxjs/operators";
import { ApiService } from "../networking/api.service";

@Component({
  selector: "app-join-organization",
  templateUrl: "./join-organization.component.html",
  styleUrls: ["./join-organization.component.scss"]
})
export class JoinOrganizationComponent implements OnInit {
  organization: Observable<Organization>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.organization = this.route.queryParams.pipe(
      map(params => {
        const inviteCode = params.invite;
        return this.api.getOrganizationFromInvite(inviteCode);
      }),
      mergeAll()
    );
  }

  join() {
    const inviteCode = this.route.snapshot.queryParams.invite;
    this.api
      .joinOrganization(inviteCode)
      .toPromise()
      .then(org => {
        console.log(org);
        if (org) {
          this.router.navigateByUrl("/dashboard");
        }
      });
  }
}
