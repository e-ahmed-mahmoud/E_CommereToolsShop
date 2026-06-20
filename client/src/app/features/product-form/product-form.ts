import { Component, inject, signal } from '@angular/core';
import { Product } from '../../shared/models/product';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatAnchor,
    MatButton,
    MatError,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  baseURL = environment.ApiUrl;
  private fb = inject(FormBuilder);
  private httpclient = inject(HttpClient);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);

  productform = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    pictureUrl: [''],
    type: ['', Validators.required],
    brand: ['', Validators.required],
    quantityInStock: [0, Validators.required],
    file: [null as File | null, Validators.required],
  });

  getControl(name: string) {
    return this.productform.get(name);
  }

  submitForm() {
    if (this.productform.invalid) {
      this.productform.markAllAsTouched();
      return;
    }

    const val = this.productform.value;
    const formData = new FormData();

    formData.append('name', val.name ?? '');
    formData.append('description', val.description ?? '');
    formData.append('price', val.price?.toString() ?? '0');
    formData.append('type', val.type ?? '');
    formData.append('brand', val.brand ?? '');
    formData.append('quantityInStock', val.quantityInStock?.toString() ?? '0');
    formData.append('pictureUrl', val.pictureUrl ?? '');

    if (val.file) {
      formData.append('file', val.file); // must match IFormFile? File in C# DTO
    }

    if (this.productform.value) {
      this.httpclient.post<Product>(`${this.baseURL}/products`, formData).subscribe({
        next: (value) => {
          this.snackbarService.success('product added successfully');
          this.router.navigateByUrl('/shop');
          console.log(value);
        },
        error: (err) => console.log,
      });
    }
  }
  onFileSelected(event: Event) {
    // FIX: Using event.target ensures accurate retrieval of the input files collection
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      const label = document.getElementById('file-name-zone');
      if (label) label.textContent = file.name;

      // Update form values
      this.productform.patchValue({
        file: file,
        pictureUrl: file.name, // Fallback string to satisfy placeholder fields
      });
    }
  }
}
