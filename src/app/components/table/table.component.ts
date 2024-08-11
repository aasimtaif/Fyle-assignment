import { Component, OnInit, ChangeDetectorRef, Input, SimpleChanges } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { workoutTypes } from '../../Data/WorkoutType';
import { Router } from '@angular/router';
interface WorkOutType {
  name: string;
  code: string;
}
interface Workout {
  type: string;
  minutes: number;
}
interface Customer {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CommonModule,
    FloatLabelModule,
    TableModule,
    ButtonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private router: Router) {}
  workoutTypes: WorkOutType[] = [];
  customers: Customer[] = []
  selectedWorkout: WorkOutType | undefined;
  filteredCustomers: Customer[] = []; // New property to hold the filtered data
  searchInput: string = '';

  @Input() usersData: Customer[] = [];
  ngOnChanges(changes: SimpleChanges) {
    if (changes['usersData'] && !changes['usersData'].firstChange) {
      this.customers = this.usersData.length ? this.usersData : JSON.parse(localStorage.getItem('usersData') || '[]').reverse();
      this.filteredCustomers = this.customers.reverse();
    }
  }
  


  ngOnInit() {
    
    this.workoutTypes = workoutTypes;
    let storedUsersData = JSON.parse(localStorage.getItem('usersData') || '[]').reverse();
    this.customers = this.usersData.length?this.usersData:storedUsersData
    this.filteredCustomers = this.customers;

  }

  goToWorkout(customer: Customer) {
    this.router.navigate(['/workout', customer.id], { state: { data: customer } });
  }
  getNoOfWorkouts(workouts: Workout[]): number {
    console.log(this.usersData)
    return workouts.length;
  }
  getTotalWorkoutTime(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }
  filterTableData() {
    this.filteredCustomers = this.customers.filter(customer => {
      const searchLower = this.searchInput.toLowerCase();
      const selectedWorkoutCode = this.selectedWorkout ? this.selectedWorkout.name : '';
      return (
        customer.name.toLowerCase().includes(searchLower) &&
        (!selectedWorkoutCode || customer.workouts.some(w => w.type === selectedWorkoutCode))
      );
    });
    console.log(this.searchInput,this.selectedWorkout,this.filteredCustomers);
  }
  clearFilters() {
    this.searchInput = '';
    this.selectedWorkout = undefined;
    this.filterTableData();
  }

}