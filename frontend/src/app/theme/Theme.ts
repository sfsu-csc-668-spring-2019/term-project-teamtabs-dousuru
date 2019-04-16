export class Theme {
  name: string;
  cssClass: string;

  constructor(name: string, cssClass: string) {
    this.name = name;
    this.cssClass = cssClass;
  }

  public toString() {
    return `Theme(${this.name}, ${this.cssClass})`;
  }

  public equals(other: Theme): boolean {
    return this.cssClass === other.cssClass;
  }
}

export const light = new Theme("Light", "light-theme");
export const dark = new Theme("Dark", "dark-theme");
export const themes = [light, dark];
