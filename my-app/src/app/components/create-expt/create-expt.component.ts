import { Component, OnInit, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from "@angular/forms";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ExperimentService } from '../../service/experiment.service';
import { getEnabledCategories } from 'trace_events';


@Component({
  selector: 'app-create-expt',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-expt.component.html',
  styleUrl: './create-expt.component.scss'
})
export class CreateExptComponent {

  formCreateExpt!:FormGroup;

  constructor(    
    private formbuilder : FormBuilder,
    private experimentService: ExperimentService,
  ){
    this.formCreateExpt = this.formbuilder.group({
      title: ["", Validators.required],
      desc: ["", Validators.required],
      materials: ["", Validators.required],
      instructions: ["", Validators.required],
      img: [null],
      categories: this.formbuilder.array([]),
    });
  }    
  
  onCheckBoxChange(event: any) {
  const categoriesFormArray = this.formCreateExpt.get('categories') as FormArray;

  if (event.target.checked) {
    categoriesFormArray.push(new FormControl(event.target.name));
  } else {
    const index = categoriesFormArray.controls.findIndex(x => x.value === event.target.name);
    categoriesFormArray.removeAt(index);
  }

  // Convert the FormArray value to JSON and assign it to the form data
  const formData = this.formCreateExpt.value;
  formData.categories = JSON.stringify(categoriesFormArray.value);

  console.log(formData);
}

    onSubmit():void{
      try{
        if (this.formCreateExpt.valid) {
          const formData = this.formCreateExpt.value;

          console.log(formData);

          this.experimentService.createExpt(formData).then(
            (formData) => {
              console.log("Skapade Experiment", formData);
            },
            (error) => {
              console.error("Lyckades inte skapa experiment ", error);
            }
          );
        }
      } catch (error) {
        console.error("Lyckades inte skapa experiment", error);
      }
    }

    ngOnInit(): void {
      this.formCreateExpt = this.formbuilder.group({  
        title: ["", Validators.required],
        desc: ["", Validators.required],
        materials: ["", Validators.required],
        instructions: ["", Validators.required],
        
        img: [null],
        categories:[[]]
      });
    }

    onFileChange(event: any) {
      console.log("Ändrar bild");
      const file = event.target.files[0];
      this.convertFileToBase64(file);
    }
  
    convertFileToBase64(file: File) {
      console.log("Ändrar till base64");
      const reader = new FileReader();
      reader.onload = () => {
        this.formCreateExpt.patchValue({
          img: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }  
}
