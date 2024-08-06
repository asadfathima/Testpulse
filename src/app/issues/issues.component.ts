import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { Issue } from '../models/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnChanges {
  @Input() selectedTimestamp!: string; // Explicitly typed as string
  issues: Issue[] = [];
  selectedIssueResponse!: string;
  activeIssueKey!: string;
  isLoading!: boolean;

  constructor(private dataService: DataService) {}


   ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected in IssuesComponent:', changes);
    if (changes['selectedTimestamp'] && changes['selectedTimestamp'].currentValue) {
      this.fetchIssues(changes['selectedTimestamp'].currentValue);
    }
  }

  private fetchIssues(timestamp: string): void {
    this.dataService.getIssues(timestamp).subscribe(
      (data) => {
        this.issues = data;
      },
      (error) => {
        console.error('Error fetching issues:', error);
      }
    );
  }

  onAISuggestionClick(issueKey: string, sonarIssueId: number): void {
    this.activeIssueKey = issueKey;  // To identify which issue's button was clicked
    this.selectedIssueResponse = "";
    this.isLoading = true;
    this.dataService.triggerApisSequentially(issueKey, sonarIssueId).subscribe(response => {
      this.selectedIssueResponse = response.response;  // Assuming 'response' field holds the data
      this.isLoading = false;
      console.log('AI Response: ', this.selectedIssueResponse);
    }, error => {
      console.error('Failed to fetch AI suggestion:', error);
      this.selectedIssueResponse = 'Failed to load AI suggestion';
    });
  }

}