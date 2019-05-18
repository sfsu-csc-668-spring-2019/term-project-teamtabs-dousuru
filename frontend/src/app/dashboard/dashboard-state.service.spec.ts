import { TestBed } from "@angular/core/testing";

import { DashboardStateService } from "./dashboard-state.service";

describe("DashboardStateService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: DashboardStateService = TestBed.get(DashboardStateService);
    expect(service).toBeTruthy();
  });
});
