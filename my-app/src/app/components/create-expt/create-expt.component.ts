import { Component, OnInit, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ExperimentService } from '../../service/experiment.service';


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
    this.formCreateExpt = new FormGroup({
      title: new FormControl(),
      desc: new FormControl(),
      materials: new FormControl(),
      instructions: new FormControl(),
      img: new FormControl(),
      Kemi: new FormControl(),
      Fysik: new FormControl(),
      Mekanik: new FormControl(),
    });
  }    
  
    onSubmit():void{
      try{
        if(this.formCreateExpt.valid && this.requireCheckboxesValidator(this.formCreateExpt)?.requireOneChecked.valueOf() === true){
          const formData = this.formCreateExpt.value;

          this.experimentService.createExpt(formData).then(
            (formData) => {
              console.log("Skapade Experiment", formData);
            },
            (error) => {
              console.error("Lyckades inte skapa experiment ", error);
            }
          );
        }
      }
      catch (error) {
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
        Kemi:[false],
        Fysik: [false],
        Mekanik:[false],
      });
      this.requireCheckboxesValidator(this.formCreateExpt);
    }

    requireCheckboxesValidator(formGroup: FormGroup) {
      const checkboxes = ['Kemi', 'Fysik', 'Mekanik'];
      const checked = checkboxes.some(checkbox => formGroup.get(checkbox)!.value);
      console.log(checked);
      return checked ? null : { requireOneChecked: true };
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
