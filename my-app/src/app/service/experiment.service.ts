import { Injectable } from '@angular/core';
import { Experiment } from '../models/experiment';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { userModel } from '../models/usermodel';

@Injectable({providedIn: 'root'})

export class ExperimentService {
  private getExperimentsUrl = 'https://localhost:7004/Experiment';
  private getExperimentUrl = 'https://localhost:7004/Experiment/';
  private postLikeUrl = 'https://localhost:7004/Like';
  private postExptUrl = '';

  httpOtions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) 
  {}

  /**GET all experiments from Database */
  getExperiments(): Observable<Experiment[]> {
    return this.http.get<Experiment[]>(this.getExperimentsUrl)
    .pipe(
      tap(_ => this.log('fetched experiments')),
      catchError(this.handleError<Experiment[]>('getExperiments', []))
    );
  }

  getExperiment(experimentid:number): Observable<Experiment[]>{
    return this.http.get<Experiment[]>(this.getExperimentUrl + experimentid)
    .pipe(
      tap(_ => this.log('fetched experiment')),
      catchError(this.handleError<Experiment[]>('getExperiment', []))
    )
  }

  async createExpt(data: any): Promise<any> {
    const response = await fetch(this.postExptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create post: " + response.statusText);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text(); // Return response as text if it's not JSON
    }
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

