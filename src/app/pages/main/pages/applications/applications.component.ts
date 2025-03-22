import { Component, inject, OnInit, signal } from '@angular/core';
import { ApplicationService } from '../../../../services/application.service';
import { Application } from '../../../../interfaces/application.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-applications',
  imports: [DatePipe],
  templateUrl: './applications.component.html',
  styles: ``
})
export class ApplicationsComponent implements OnInit{

  private applicationService = inject(ApplicationService)

  applications = signal<Application[]>([])

  getApplications() {
    this.applicationService.indexApplications().subscribe((response: Application[]) => {
      this.applications.set(response)
    })
  }

  ngOnInit(): void {
    this.getApplications()
  }

}
