import { AlertService } from './alert.service';
import { Component, OnInit, Input } from '@angular/core';
import { Alert, AlertType } from './alert';

@Component({
  selector: 'ap-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() timeout = 3000;
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {

    this.alertService
      .getAlert()
      .subscribe(alert => {
        if (!alert) {
          this.alerts = [];
          return;
        }
        this.alerts.push(alert);
        setTimeout(() => this.removeAlert(alert), this.timeout);
      })
  }

  removeAlert(alertToRemove: Alert): void {
    this.alerts = this.alerts.filter(alert => alert != alertToRemove);
  }

  getAlertClass(alert: Alert) {

    if (!alert) return '';

    return 'alert alert-' + alert.alertType.toString();
  }

}
