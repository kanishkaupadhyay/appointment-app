import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];
  // ngOnInit life cycle hook
  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments");
    if(savedAppointments){
      this.appointments = JSON.parse(savedAppointments);
    }
  }

  addAppointment(): void {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let appoint: Appointment = {
        id: this.appointments.length + 1,
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }
      this.appointments.push(appoint);

      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();

      localStorage.setItem("appointments", JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number): void {
    if (this.appointments.length - 1 >= index && index >= 0) {
      this.appointments.splice(index, 1);
      localStorage.setItem("appointments", JSON.stringify(this.appointments));
    }
  }
}
