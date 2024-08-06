import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Issue } from './models/issue';

export interface TimestampCount {
  count: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private baseUrl = 'http://localhost:5000';  // Base URL for the API

  constructor(private http: HttpClient) {}

  getTimestamps(): Observable<TimestampCount[]> {
    return this.http.get<TimestampCount[]>(`${this.baseUrl}/get_issue_timestamp_counts`);
  }

  getIssues(timestamp: string): Observable<Issue[]> {
    //return this.http.get<Issue[]>(`${this.baseUrl}/get_issues_by_timestamp?timestamp=${encodeURIComponent(timestamp)}`);
    const encodedTimestamp = encodeURIComponent(timestamp);
    console.log(`Fetching issues for timestamp: ${timestamp} (encoded: ${encodedTimestamp})`);
    const url = `${this.baseUrl}/get_issues_by_timestamp?timestamp=${encodedTimestamp}`;
    return this.http.get<Issue[]>(url);
  }



  triggerApisSequentially(issueId: string, sonarIssueId: number): Observable<any> {
    const firstApiUrl = `http://localhost:5000/get_issue_files?issue_id=${issueId}&id=${sonarIssueId}`;
    const secondApiUrl = `http://localhost:5000/update_final_path?sonar_issue_id=${sonarIssueId}&issue_key=${issueId}`;
    const thirdApiUrl = `http://localhost:5000/analyze_issue?issue_key=${issueId}&sonar_issue_id=${sonarIssueId}`;

    return this.http.get<any>(firstApiUrl).pipe(
      switchMap((firstApiResponse: any) => {
        // Assuming the response from the first API doesn't need to be passed to the second
        return this.http.get<any>(secondApiUrl).pipe(
          switchMap((secondApiResponse: any) => {
            // Assuming the response from the second API doesn't need to be passed to the third
            return this.http.get<any>(thirdApiUrl);
          })
        );
      }),
      catchError(error => {
        console.error('API sequence error:', error);
        return of(null);  // Emitting null or an appropriate fallback value
      })
    );
  }


  // analyzeIssue(issueKey: string, sonarIssueId: number): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/analyze_issue?issue_key=${issueKey}&sonar_issue_id=${sonarIssueId}`);
  // }
}
