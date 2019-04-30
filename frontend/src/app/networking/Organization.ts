export class Organization {
  constructor(name: string, thumbnailUrl: string) {
    this.name = name;
    this.thumbnailUrl = thumbnailUrl;
  }
  name: string;
  thumbnailUrl: string;
  active = false;
}
