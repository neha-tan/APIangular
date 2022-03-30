import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
customerName:string="";
customerPassword:string="";
customerEmail:string="";
customerNumber:string="";
  constructor(private _customer:FormService) { }
  public signup(){
    this._customer.signupuser(this.customerName,this.customerEmail,this.customerNumber,this.customerPassword).subscribe(data=>{
      if(data.error)
      alert('signup failed');
      else
      alert('signup succsess');
    });
  }


  ngOnInit(): void {
  }

}
