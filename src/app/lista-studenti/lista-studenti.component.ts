import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-studenti',
  templateUrl: './lista-studenti.component.html',
  styleUrls: ['./lista-studenti.component.scss']
})
export class ListaStudentiComponent implements OnInit {

  student: string;
  students: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addStudent(): void{
    this.students.push(this.student);
    this.student = null;
  }

  removeStudent(s): void{
    this.students = this.students.filter(item => item !== s);
  }

  drawStudent(){
    var randStudent = this.students[Math.floor(Math.random() * this.students.length)];
    this.removeStudent(randStudent);
  }
}

