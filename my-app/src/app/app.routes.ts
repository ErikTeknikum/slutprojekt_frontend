import { Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { PostComponent } from './components/post/post.component';
import { CreateExptComponent } from './components/create-expt/create-expt.component';

export const routes: Routes = [
    {path: "", component: HomePageComponent, title: "Experiment Portalen"},
    {path: "login", component: LogInComponent, title: "Experiment Portalen"},
    {path: ":experimentid", component: PostComponent, title:"Experiment Portalen"},
    {path: "create", component: CreateExptComponent, title:"Experiment Portalen"}
];

export default Routes;