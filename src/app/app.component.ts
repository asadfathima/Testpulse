import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTimestamp!: string;
  onTimestampSelected(timestamp: string): void {
    this.selectedTimestamp = timestamp;
  }
}
