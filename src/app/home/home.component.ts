import { Component, OnInit } from '@angular/core';
import { apiService } from '../services/api.service';
import { PaymentDetail } from '../classes/PaymentDetail';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  model: any;
  editClicked?: boolean;
  id?: string;
  cardHolders?: PaymentDetail[];
  selectedIndex?: number;
  countCardHolders!: number;

  constructor(
    private apiService: apiService,
    private formBuilder: FormBuilder
  ) {
    this.model = this.formBuilder.group({
      cardHolderName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required, Validators.max(3)]),
    });
  }
  ngOnInit(): void {
    this.apiService.getAllCardHolders().subscribe((data) => {
      this.cardHolders = data.sort(
        (a: any, b: any) => a.created_at - b.created_at
      );
      this.countCardHolders = data.length;
    });
  }
  onSubmit(cardHolderData: any) {
    if (!this.editClicked) {
      this.apiService.createCardHolder(cardHolderData).subscribe((data) => {
        this.cardHolders?.unshift(data);
        this.countCardHolders = data.length;
      });
    } else {
      this.apiService
        .patchCardHolder(cardHolderData, this.id)
        .subscribe((data) => {
          this.cardHolders?.map((_data: PaymentDetail, index) => {
            if (index === this.selectedIndex) {
              _data.cardHolderName = cardHolderData.cardHolderName;
              _data.cardNumber = cardHolderData.cardNumber;
              _data.expirationDate = cardHolderData.expirationDate;
              _data.cvv = cardHolderData.cvv;
            }
          });
        });
    }
  }
  editClick(cardHolderData: PaymentDetail, id: string, index: number) {
    this.model = this.formBuilder.group({
      cardHolderName: new FormControl(cardHolderData.cardHolderName, [
        Validators.required,
      ]),
      cardNumber: new FormControl(cardHolderData.cardNumber, [
        Validators.required,
      ]),
      expirationDate: new FormControl(cardHolderData.expirationDate, [
        Validators.required,
      ]),
      cvv: new FormControl(cardHolderData.cvv, [
        Validators.required,
        Validators.max(3),
      ]),
    });
    this.editClicked = true;
    this.selectedIndex = index;
    this.id = id;
  }
  addNew() {
    this.editClicked = false;
    this.model = this.formBuilder.group({
      cardHolderName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required, Validators.max(3)]),
    });
    this.id = undefined;
    this.selectedIndex = undefined;
  }
  destroyCard(id: string, index: number) {
    this.apiService.destroy(id).subscribe((_) => {
      this.cardHolders?.splice(index, 1);
      this.countCardHolders = this.countCardHolders - 1;
    });
  }
}
