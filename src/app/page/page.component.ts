import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewChecked {

  key: string;
  azValue: string;
  ruValue: string;
  enValue: string;
  // parsingKey = {
  //   first: '',
  //   second: ''
  // };
  firstKeyPart = '';
  secondKeyPart = '';
  valid = false;
  keyRows = [];
  copy = [];
  editingKey = '';
  addClick = false;

  @ViewChild('newRow') formModel: NgForm;

  constructor(
    private firesServices: AngularFirestore,
    private dataBase: AngularFireDatabase,
    private changeRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.list();
  }

  ngAfterViewChecked(): void {
    this.changeRef.detectChanges();
  }

  add(form?): void {

    // if (this.formModel.valid) {
    this.addClick = true;
    // const arr = this.key.split('.');
    // this.parsingKey.first = arr[0];
    // this.parsingKey.second = arr[1];
    this.dataBase.object('keys/az/' + this.firstKeyPart).update({[this.secondKeyPart]: this.azValue})
      .then(_ => this.azValue = '')
      .catch(err => console.log(err, 'You dont have access!'));
    this.dataBase.object('keys/ru/' + this.firstKeyPart).update({[this.secondKeyPart]: this.ruValue})
      .then(_ => this.ruValue = '')
      .catch(err => console.log(err, 'You dont have access!'));
    this.dataBase.object('keys/en/' + this.firstKeyPart).update({[this.secondKeyPart]: this.enValue})
      .then(_ => this.enValue = '')
      .catch(err => console.log(err, 'You dont have access!'));
    // }

    this.azValue = '';
    this.secondKeyPart = '';
    this.addClick = false;
  }



  list(): void {
    this.dataBase.list('keys').valueChanges()
      .subscribe(actions => {
        const arr = actions;
        this.keyRows = [...arr];
      });
  }

  checkDisabled(firstKey, secondKey): boolean {
    return !(this.editingKey === firstKey + secondKey);
  }

  edit(firstKey, secondKey): void {
    this.list();
    this.editingKey = firstKey + secondKey;
  }

  setNew(eventAZ, eventEn, eventRU, firstKey, secondKey): boolean {
    if (eventAZ.length === 0 || eventEn.length === 0 || eventRU.length === 0) {
      // todo исправить эту ошибку__ не правильно копируестя массив
      console.log(this.keyRows);
      console.log(this.copy);
      this.list();
      return false;
    }

    this.dataBase.object('keys/az/' + firstKey).update({[secondKey]: eventAZ})
      .then(_ => this.enValue = '')
      .catch(err => console.log(err, 'You dont have access!'));

    this.dataBase.object('keys/ru/' + firstKey).update({[secondKey]: eventRU})
      .then(_ => this.enValue = '')
      .catch(err => console.log(err, 'You dont have access!'));

    this.dataBase.object('keys/en/' + firstKey).update({[secondKey]: eventEn})
      .then(_ => this.enValue = '')
      .catch(err => console.log(err, 'You dont have access!'));
    this.editingKey = '';
  }

  copyFirst(): void {
    if (this.azValue) {
      this.enValue = this.ruValue = this.azValue;
      this.add();
    }
  }
}


