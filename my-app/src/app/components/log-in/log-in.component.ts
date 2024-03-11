import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})

export class LogInComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ["", Validators.required],
      pwd: ["", Validators.required]
    })    
  }
  onSubmit(){
    console.log("LOGGA IN");
  }
  get email() {
    return this.loginForm.get("email");
  }

  get pwd(){
    return this.loginForm.get("pwd");
  }
}
