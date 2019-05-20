import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Cloudinary } from "@cloudinary/angular-5.x";

@Injectable({
  providedIn: "root"
})
export class ImageUploaderService {
  constructor(private cloudinary: Cloudinary, private http: HttpClient) {}

  upload(icon: any): Observable<string> {
    const cloudName = this.cloudinary.cloudinaryInstance.config().cloud_name;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=dousuru`;
    console.log(url);
    const formData = new FormData();
    formData.append("file", icon);
    return this.http
      .post(url, formData)
      .pipe(map((imgObj: any) => imgObj.secure_url));
  }
}
