import { Component, OnInit } from '@angular/core';
import { ITransaction } from '../models/Transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction',
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
    observable.subscribe({
      next: (data) => this.transactions = data,
      error: (err) => console.error(err)
    });
  }
}
