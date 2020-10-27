import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-studenti',
  templateUrl: './lista-studenti.component.html',
  styleUrls: ['./lista-studenti.component.scss']
})
export class ListaStudentiComponent implements OnInit {

  student: string;
  studentList: string[] = [];

  titleList: string[] = [
    'Buongiorno',
    'Hey.',
    'Chi sarà il fortunato?',
    "Pronti per l'interrogazione?"
  ];
  drawTitleList: string[] = [
    'Oggi tocca a #',
    'Forza #, tifiamo per te!',
    '# è il fortunato vincitore'
  ]
  title: string;

  constructor() { }

  ngOnInit(): void {
    this.title = this.randomString(this.titleList);
    let savedStudents = JSON.parse(localStorage.getItem('students'));
    if(savedStudents)
      this.studentList = savedStudents;
  }

  addStudent(): void{
    if(this.student){
      this.studentList.push(this.student);
      this.updateLocalStorage();
    }
    this.student = null;
  }

  removeStudent(s): void{
    this.studentList = this.studentList.filter(item => item !== s);
    this.updateLocalStorage();
  }

  drawStudent(){
    let randStudent = this.randomString(this.studentList);
    let randTitle = this.randomString(this.drawTitleList);
    this.title = randTitle.replace('#', randStudent);
    this.removeStudent(randStudent);
  }

  //Utilities
  randomString(array): string{
    return array[Math.floor(Math.random() * array.length)];
  }

  updateLocalStorage(){
    localStorage.removeItem('students');
    localStorage.setItem('students', JSON.stringify(this.studentList));
  }
}

