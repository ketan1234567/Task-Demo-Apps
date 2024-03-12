import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignupService } from './services/signup.service';
import { AsyncSubject, Observable } from 'rxjs';
import { SelectedFiles } from './SelectedFiles';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';




@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  name: string;
  file: any;
  base64?: string;
  files: any
  allData: any
  editUser: any
  imageDataDisplay: any
  EditById: any
  public selectedFiles: SelectedFiles[] = [];
  image: any = "https://resource.itbusinesstoday.com/whitepapers/main-img.png";

  constructor(private _services: SignupService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  @ViewChild('closebutton') closebutton;

  ngOnInit() {
    this.getSignupUser()
    this.GetAllImages()
    this.imageDataDisplay = this.sanitizer.bypassSecurityTrustUrl(this.imageDataDisplay);
  }

  reactiveForm = new FormGroup({
    id:new FormControl(),
    first_name: new FormControl([]),
    last_name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    state: new FormControl(),
    country: new FormControl(),
    address: new FormControl(),
    tag: new FormControl(),
  })
  onEditUser(id: any) {
    console.log(id);

    // this.isEditMode = true
    // this.isEditMode = true; // Set edit mode flag
    this._services.onEditByUser(id).subscribe(
      (result) => {
        if (result && result.id) {
          console.log(result.id);
          this.editUser = result;
          this.EditById = id;

          console.log(this.EditById);


          this.reactiveForm.setValue({
            id:this.editUser.id,
            first_name: this.editUser.first_name,
            last_name: this.editUser.last_name,
            email: this.editUser.email,
            phone: this.editUser.phone,
            state: this.editUser.state,
            country: this.editUser.country,
            address:this.editUser.address,
            tag:this.editUser.tag

          });
        } else {
          console.error("Error: Unexpected response or missing data", result);
          // Handle error case appropriately, e.g., show error message to the user
        }
      },
      (error) => {
        console.error("Error:", error);
        // Handle error case appropriately, e.g., show error message to the user
      }
    )

  }

  




  onSubmit() {
    



    const formData = this.reactiveForm.value;
    this._services.userSignUp(this.reactiveForm.value)
  console.log(formData)






    this.toFilesBase64(this.files, this.selectedFiles).subscribe((res: SelectedFiles[]) => {
      this.selectedFiles = res;
      console.log(this.selectedFiles)



      this.http.post<any>('http://localhost:3000/images', this.selectedFiles)
        .subscribe(
          response => {
            Swal.fire({ text: "Successfully Saved", icon: 'success' })
              .then(function (result) {
                (['/curd_Operation'])

              }

              )
            this.closebutton.nativeElement.click()
            this.ngOnInit()
          },

          error => {
            console.error('Error uploading image:', error);
          }
        );
      this.reactiveForm.reset()

      //  console.log(this.selectedFiles[0].base64)

    });
  }




  public toFilesBase64(files: File[], selectedFiles: SelectedFiles[]): Observable<SelectedFiles[]> {
    const result = new AsyncSubject<SelectedFiles[]>();
    if (files?.length) {
      Object.keys(files)?.forEach(async (file, i) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (e) => {
          selectedFiles = selectedFiles?.filter(f => f?.name != files[i]?.name)
          selectedFiles.push({ name: files[i]?.name, file: files[i], base64: reader?.result as string })
          result.next(selectedFiles);
          if (files?.length === (i + 1)) {
            result.complete();
          }
        };
      });
      return result;
    } else {
      result.next([]);
      result.complete();
      return result;
    }
  }

  public onFileSelected(files: File[]) {
    //console.log(this.selectedFiles[0])
    // this.selectedFiles = []; // clear
    this.files = files



  }
  getSignupUser() {
    this._services.getSignupUser().subscribe((result) => {
      console.log(result);
      this.allData = result
      console.log(this.allData[0].last_name);


    })

  }
  GetAllImages() {

    this._services.getimages().subscribe((result) => {
      console.log(result, "this is images coming ");
      this.imageDataDisplay = result[0][0].base64
      //  console.log(this.imageDataDisplay);

      // this.toFilesBase64.result
      // this.toFilesBase64(result, this.selectedFiles).subscribe((res: SelectedFiles[]) => {
      //   this.selectedFiles = res;

      // });

    })
    // this.selectedFiles = []; // clear
    // this.toFilesBase64(files, this.selectedFiles).subscribe((res: SelectedFiles[]) => {
    //   this.selectedFiles = res;
    // });
  }

}

