import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaymentDetail } from '../classes/PaymentDetail';

var url = "https://localhost:5001/api/Payment";

@Injectable()
export class apiService {
  constructor(private httpClient: HttpClient) {}
  getAllCardHolders(): Observable<any> {
    return this.httpClient.get(url)
  }
  getCardHolderById(id: string): Observable<any> {
    return this.httpClient.get(`${url}/${id}`)
  }
  createCardHolder(cardHolderInfo: PaymentDetail): Observable<any> {
    var totalInfo = {
      id: cardHolderInfo.id,
      cardHolderName: cardHolderInfo.cardHolderName,
      cardNumber: cardHolderInfo.cardNumber,
      cvv: cardHolderInfo.cvv,
      expirationDate: cardHolderInfo.expirationDate,
      created_at: new Date()
    }
    return this.httpClient.post(url, totalInfo)
  }
  patchCardHolder(cardHolderInfo: PaymentDetail, id: any): Observable<any> {
    var totalInfo = {
      id: id,
      cardHolderName: cardHolderInfo.cardHolderName,
      cardNumber: cardHolderInfo.cardNumber,
      cvv: cardHolderInfo.cvv,
      expirationDate: cardHolderInfo.expirationDate,
    }
    return this.httpClient.put(`${url}/${id}`, totalInfo)
  }
  destroy(id: string): Observable<any> {
    return this.httpClient.delete(`${url}/${id}`)
  }
}
