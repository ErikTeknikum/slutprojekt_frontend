import { Component, OnInit, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';

@Component({
  selector: 'app-create-expt',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-expt.component.html',
  styleUrl: './create-expt.component.scss'
})
export class CreateExptComponent {

  formCreateExpt!:FormGroup;

  constructor(
    private formbuilder : FormBuilder
    ){}    
  
    onSubmit():void{
      if (this.formCreateExpt.valid) {
        // Send data to backend
        console.log(this.formCreateExpt.value);
      } else {
        // Handle form validation errors
        console.error('Form is invalid');
      }
    }

    ngOnInit(): void {
      this.formCreateExpt = this.formbuilder.group({  
        titel: ["", Validators.required],
        desc: ["", Validators.required],
        materials: ["", Validators.required],
        instructions: ["", Validators.required],
        
        img: [null],
        Kemi:[false],
        Fysik: [false],
        Mekanik:[false],


      }, {validators: this.requireCheckboxesValidator } as AbstractControlOptions
      );
    }

    requireCheckboxesValidator(formGroup: FormGroup) {
      const checkboxes = ['checkbox1', 'checkbox2', 'checkbox3'];
      const checked = checkboxes.some(checkbox => formGroup.get(checkbox)!.value);
      return checked ? null : { requireOneChecked: true };
    }

    onFileChange(event: any) {
      const file = event.target.files[0];
      this.convertFileToBase64(file);
    }
  
    convertFileToBase64(file: File) {
      const reader = new FileReader();
      reader.onload = () => {
        this.formCreateExpt.patchValue({
          img: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }  
}
