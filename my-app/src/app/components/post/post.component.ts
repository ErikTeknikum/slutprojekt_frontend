import { Component, OnInit, NgModule} from '@angular/core';
import { ExperimentService } from '../../service/experiment.service';
import { Experiment } from '../../models/experiment';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-post',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './post.component.html',
  styleUrl: '../../../styles.scss'
})

export class PostComponent implements OnInit{

  experiments : Experiment[] = [];
  constructor(
  private router: Router,
  private ActivatedRouter: ActivatedRoute,
  private experimentservice:ExperimentService){}


  ngOnInit(): void {
    this.ActivatedRouter.params.subscribe((params) => {
    const experimentid = +params['experimentid'];
    console.log(experimentid);
    if(experimentid){
      this.getExpt(experimentid)
    }
    })
  }

  //Redirects to page to single experiment
 

  getExpt(id:number): void {

    this.experimentservice.getExperiment(id)
    .subscribe(expts => {
      this.experiments = Array.isArray(expts) ? expts: [expts];
      console.log(this.experiments);
    });
  }  
}