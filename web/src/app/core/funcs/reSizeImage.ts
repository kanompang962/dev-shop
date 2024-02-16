import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageResizeService {

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!canvas || !ctx) {
          reject('Canvas or 2D context is not supported.');
          return;
        }

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject('Failed to convert canvas to Blob.');
          }
        }, 'image/jpeg');
      };

      img.onerror = () => {
        reject('Error loading image.');
      };
    });
  }
}
