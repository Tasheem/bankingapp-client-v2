import { Component, OnInit } from '@angular/core';
import { ITransaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  public transactions: ITransaction[]
  public identity: string

  constructor(private service: TransactionService) { 
    this.transactions = [];
    const name = window.sessionStorage.getItem('Name');
    this.identity = `${name!}'s`;
  }

  ngOnInit(): void {
    this.getTransaction();
  }

  private getTransaction(): void {
    const observable = this.service.getTransaction();

    const callback = (data: ITransaction[]) => {
      const getDateTime = (date?: Date) => {
        return date != null ? date.getTime() : 0;
      }

      this.transactions = data.sort((a: ITransaction, b: ITransaction) => getDateTime(new Date(b.date!)) - getDateTime(new Date(a.date!)));
    }
    
    const observer = {
      next: callback,
      error: (err: Error) => console.error(err)
    };
    
    observable.subscribe(observer);
  }
}
