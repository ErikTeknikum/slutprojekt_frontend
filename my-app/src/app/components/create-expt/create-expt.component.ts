import { Component, OnInit, NgModule} from '@angular/core';
import { ExperimentService } from '../../service/experiment.service';
import { Experiment } from '../../models/experiment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-expt',
  standalone: true,
  imports: [],
  templateUrl: './create-expt.component.html',
  styleUrl: './create-expt.component.scss'
})
export class CreateExptComponent {
  constructor(
    private router: Router,
    private experimentservice:ExperimentService){}
    experiments : Experiment[] = [];
  
    onSubmit():void{
      
    }
}
