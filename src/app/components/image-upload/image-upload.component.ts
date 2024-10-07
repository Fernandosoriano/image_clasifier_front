import { Component } from '@angular/core';
import { ImageUploadService } from '../../services/image-upload.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-image-upload',
  standalone: true,
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css', 
  providers: [ImageUploadService, FormsModule]

})
export class ImageUploadComponent {
  dataDict: any
  selectedFile   : File | null = null;
  responseMessage: string | null = null;

  constructor(private apiService: ImageUploadService) { }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();  // Evitar la recarga de la página
    if (this.selectedFile) {
      this.apiService.uploadImage(this.selectedFile).subscribe(
        response => {
          this.dataDict = response['final_result'];
          this.responseMessage = `The model predicts that the image that you uploaded is
        a ${this.dataDict['description']} with a precision of: ${(this.dataDict['score']*100).toFixed(2)} %`
        },
        error => {
          this.responseMessage = 'Failed to upload image.';
        }
      );
    } else {
      this.responseMessage = 'No file selected.';
    }
  }
}
