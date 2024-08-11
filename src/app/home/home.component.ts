import { Component, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../components/table/table.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { workoutTypes } from '../Data/WorkoutType';

interface Workout {
  type: string;
  minutes: number;
}
interface WorkOutType {
  name: string;
  code: string;
}

interface userData {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatLabelModule, TableComponent, AutoCompleteModule, DropdownModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  workoutTypes: WorkOutType[] = [];
  customers: userData = {
    id: 1,
    name: '',
    workouts: []
  };
  usersData: userData[] = [];
  selectedWorkout: WorkOutType | null = null;
  nameInput: string = '';
  workOuts: Workout[] = [];
  workoutTime!: any;

  constructor() {
    this.workoutTypes = workoutTypes;
  }

  addWorkout(): void {
    if (this.selectedWorkout) {
      this.workOuts.push({
        type: this.selectedWorkout.name,
        minutes: this.workoutTime
      });
    }
    this.workoutTime = null;
    this.selectedWorkout = null;
  }

  removeWorkout(index: number): void {
    this.workOuts.splice(index, 1);
  }

  submitData(): void {
    if (this.customers.name) {
      let storedUserData = JSON.parse(localStorage.getItem('usersData') || '[]');
      if (this.workoutTime && this.selectedWorkout) {
        this.workOuts.push({
          type: this.selectedWorkout.name,
          minutes: this.workoutTime
        });
      }
      this.customers = {
        id: storedUserData.length + 1,
        name: this.customers.name,
        workouts: this.workOuts
      };
      this.workOuts = [];
      storedUserData.push(this.customers);
      localStorage.setItem('usersData', JSON.stringify(storedUserData));
      this.usersData = storedUserData;
      this.customers = {
        id: 1,
        name: '',
        workouts: []
      };
      this.selectedWorkout = null;
      this.workoutTime = null;
    }
  }

}
