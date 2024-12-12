import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageStatusType } from '../../types/MessageStatusType';
import { GetAllItemsType } from '../../types/GetAllItemsType';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  urlCreateItem = "http://localhost:3001/api/items/create";
  urlGetAllItems = "http://localhost:3001/api/items/get_all";
  urlUpdateItem = "http://localhost:3001/api/items/update";
  urlRemoveItem = "http://localhost:3001/api/items/destroy";

  constructor(
    private http: HttpClient
  ) { }

  createItemService(
    name: string,
    operation: string,
    price: number,
    userId: string | null,
    token: string | null
  ): Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    const body = {
      'name': name,
      'operation': operation,
      'price': price,
      'userId': userId
    };

    return this.http.post<MessageStatusType>(this.urlCreateItem, body, httpOptions);
  }

  getAllItemsService(token: string | null): Observable<GetAllItemsType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.http.get<GetAllItemsType>(this.urlGetAllItems, httpOptions);
  }

  updateItemService(
    itemId: string,
    name: string,
    operation: string,
    price: string,
    token: string | null
  ):Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    const body = {
      'name': name,
      'operation': operation,
      'price': price
    };

    return this.http.patch<MessageStatusType>(this.urlUpdateItem + "/"+ itemId,body,httpOptions);
  } 

  deleteItemService(itemId: string, token: string | null): Observable<MessageStatusType>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.delete<MessageStatusType>(this.urlRemoveItem + "/"+ itemId,httpOptions);
  }
}