import { Component, OnInit, NgModule} from '@angular/core';
import { ExperimentService } from '../../service/experiment.service';
import { Experiment } from '../../models/experiment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: '../../../styles.scss'
})

export class HomePageComponent implements OnInit{

  constructor(
  private router: Router,
  private experimentservice:ExperimentService){}
  experiments : Experiment[] = [];

  ngOnInit(): void {
    this.getExpts();
  }

  articleId(experimentid:number):void{
    console.log(experimentid);
    this.router.navigate([`${experimentid}`]);
  }

  getExpts(): void {
    this.experimentservice.getExperiments()
    .subscribe(expts => {
      this.experiments = expts;
      console.log(this.experiments);
    });
  }
}
