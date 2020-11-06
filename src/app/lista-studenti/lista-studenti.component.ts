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
  private titleList: string[] = ['Buongiorno', 'Hey.', 'Chi sarà il fortunato?', "Pronti per l'interrogazione?"];
  private drawTitleList: string[] = ['Oggi tocca a #', 'Forza #, tifiamo per te!', '# è il fortunato'];

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

  checkStudent(s: string): boolean {
    this.isValid = !this.studentList.includes(s);
    return this.isValid
  }

  addStudent(): void {
    if (this.student && this.checkStudent(this.student)) {
      this.studentList.push(this.student);
      this.student = null;
    }
  }

  drawStudent() {
    let randStudent = this.randomString(this.studentList);
    let randTitle = this.randomString(this.drawTitleList);
    this.title = randTitle.replace('#', randStudent);
    this.removeStudent(randStudent);
  }

  removeStudent(s?: string): void {
    s ? this.studentList = this.studentList.filter(item => item !== s) : this.studentList = []
  }

  //Estrare stringa random da array
  randomString(array): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  //Salva i dati prima che la pagina venga chiusa o refreshata
  @HostListener('window:beforeunload') updateStorage() {
    localStorage.setItem('students', JSON.stringify(this.studentList));
  }

}

