import { TestBed } from "@angular/core/testing";

import { MockProjectService } from "./mock-project.service";

describe("MockProjectService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MockProjectService = TestBed.get(MockProjectService);
    expect(service).toBeTruthy();
  });
});
