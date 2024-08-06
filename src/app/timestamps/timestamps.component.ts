import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService, TimestampCount } from '../data.service';


@Component({
  selector: 'app-timestamps',
  templateUrl: './timestamps.component.html',
  styleUrls: ['./timestamps.component.css']
})
export class TimestampsComponent implements OnInit {
  timestamps: TimestampCount[] = [];
  selectedTimestamp!: string;
  @Output() timestampSelected = new EventEmitter<string>();

  constructor(private dataService: DataService) {}

  // ngOnInit(): void {
  //   this.dataService.getTimestamps().subscribe(
  //     next: (data) => {
  //       this.timestamps = data;  // Assign the data received from the API
  //     },
  //     error => {
  //       console.error('Error fetching timestamps:', error);
  //     }
  //   );
  // }

  ngOnInit() {
    this.loadTimestamps();
  }

  loadTimestamps() {
    this.dataService.getTimestamps().subscribe({
      next: (data) => {
        this.timestamps = data;  // Assign the data received from the API
      },
      error: (error) => {
        console.error('Error fetching timestamps:', error);
      }
    });
  }


  onSelect(timestamp: string): void {
    this.timestampSelected.emit(timestamp);
    console.log('Selected Timestamp:', this.selectedTimestamp);
  }
}