import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-lista-studenti',
  templateUrl: './lista-studenti.component.html',
  styleUrls: ['./lista-studenti.component.scss']
})
export class ListaStudentiComponent implements OnInit, AfterViewInit {

  @ViewChild('inputName', { static: true }) inputName: ElementRef;

  public student: string;
  public studentList: string[] = [];

  public title: string;
  private titleList: string[] = ['Buongiorno', 'Chi sarà il fortunato?', "Buona interrogazione!"];
  private drawTitleList: string[] = ['Oggi tocca a #', 'Forza #!', 'Il fortunato è #'];

  public isValid: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.title = this.randomString(this.titleList);
    let savedStudents = JSON.parse(localStorage.getItem('students'));
    if (savedStudents)
      this.studentList = savedStudents;
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputName.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(250)
      , distinctUntilChanged()
    ).subscribe(s => {
      this.checkStudent(s)
    });
  }

  //il nome è valido se non è presente nella lista, se non è fatto solo di spazi e se l'input è vuoto
  checkStudent(s: string): boolean {
    if(!this.studentList.includes(this.toTitleCase(s).trim()) && (s.trim().length > 0 || s.length == 0))
      this.isValid = true;
    else 
      this.isValid = false;
    return this.isValid
  }

  addStudent(): void {
    if (this.student && this.checkStudent(this.student)) {
      this.studentList.push(this.toTitleCase(this.student.trim()));
      this.student = null;
    }
  }

  //estrae lo studente, genera il titolo con il suo nome e lo rimuove dalla lista
  drawStudent() {
    let randStudent = this.randomString(this.studentList);
    let randTitle = this.randomString(this.drawTitleList);
    this.title = randTitle.replace('#', randStudent);
    this.removeStudent(randStudent);
  }

  //rimuove lo studente selezionato o tutti gli studenti in base al parametro
  removeStudent(s?: string): void {
    s ? this.studentList = this.studentList.filter(item => item !== s) : this.studentList = []
  }

  //Estrare stringa random da array
  randomString(array): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  //Converte la stringa in title case
  toTitleCase(str: string) {
    str.trim();
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  //Salva i dati prima che la pagina venga chiusa o refreshata
  @HostListener('document:visibilitychange') updateStorage() {
    localStorage.setItem('students', JSON.stringify(this.studentList));
  }

}

