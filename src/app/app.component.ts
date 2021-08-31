import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
 mortgageCal: FormGroup;
  info: Info[]=[];
  no_of_Payments=0;
  mAmount=true;
  iRate=true;
  multiplier:any =[1,52,26,24,12]
  terms = [
    { id: 1, name: "1 Year" },
    { id: 2, name: "2 Years" },
    { id: 3, name: "3 Years" },
    { id: 4, name: "4 Years" },
    { id: 5, name: "5 Years" },
    { id: 6, name: "6 Years" },
    { id: 7, name: "7 Years" },
    { id: 8, name: "8 Years" },
    { id: 9, name: "9 Years" },
    { id: 10, name: "10 Years" }
  ];

  amortizationYears = [
    { id: 1, name: "1 Year" },
    { id: 2, name: "2 Year" },
    { id: 3, name: "3 Year" },
    { id: 4, name: "4 Year" },
    { id: 5, name: "5 Year" },
    { id: 6, name: "6 Years" },
    { id: 7, name: "7 Years" },
    { id: 8, name: "8 Years" },
    { id: 9, name: "9 Years" },
    { id: 10, name: "10 Years" },
    { id: 11, name: "11 Years" },
    { id: 12, name: "12 Years" },
    { id: 13, name: "13 Years" },
    { id: 14, name: "14 Years" },
    { id: 15, name: "15 Years" },
    { id: 16, name: "16 Years" },
    { id: 17, name: "17 Years" },
    { id: 18, name: "18 Years" },
    { id: 19, name: "19 Years" },
    { id: 20, name: "20 Years" },
    { id: 21, name: "21 Years" },
    { id: 22, name: "22 Years" },
    { id: 23, name: "23 Years" },
    { id: 24, name: "24 Years" },
    { id: 25, name: "25 Years" },
    { id: 26, name: "26 Years" },
    { id: 27, name: "27 Years" },
    { id: 28, name: "28 Years" },
    { id: 29, name: "29 Years" },
    { id: 30, name: "30 Years" },
  ];

  amortizationMonths = [
    { id: 1, name: "1 Month" },
    { id: 2, name: "2 Months" },
    { id: 3, name: "3 Months" },
    { id: 4, name: "4 Months" },
    { id: 5, name: "5 Months" },
    { id: 6, name: "6 Months" },
    { id: 7, name: "7 Months" },
    { id: 8, name: "8 Months" },
    { id: 9, name: "9 Month" },
    { id: 10, name: "10 Months" },
    { id: 11, name: "11 Months" }
  ];

  paymentFrequencies = [
    { id: 1, name: "Weekly" },
    { id: 2, name: "Bi-Weekly (every 2 weeks)" },
    { id: 3, name: "Semi-monthly (24x per year)" },
    { id: 4, name: "Monthly (12x per year)" }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.info.push({category:"Mortgage Payment",term:0,amortization:0});
    this.info.push({category:"Principal Payments",term:0,amortization:0});
    this.info.push({category:"Interest Payments",term:0,amortization:0});
    this.info.push({category:"Total Cost",term:0,amortization:0});

  }

  ngOnInit() {
    this.mortgageCal = this.formBuilder.group({
      mortgageAmount: [100000.00],
      interestRate: [5.00],
      amortizationYear: [25],
      //amortizationMonth: [null],
      paymentFrequency: [4],
      //term: [5]
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  //get f() { return this.mortgageCal.controls; }

  onCalculate(){
    this.mAmount=true;
    this.iRate=true;
    let principle = this.mortgageCal.value['mortgageAmount'];
    let intRate = this.mortgageCal.value['interestRate'];
    console.log('intRate',intRate);
    if(principle<=0||principle===null||intRate<=0||intRate===null){
      if(principle<=0||principle===null)
      this.mAmount=false;
      if(intRate<=0||intRate===null)
      this.iRate=false;
      return;
    }
      let totalNoPayments = this.mortgageCal.value['amortizationYear'] * this.multiplier[this.mortgageCal.value['paymentFrequency']];
      let interest = (intRate/100)/this.multiplier[this.mortgageCal.value['paymentFrequency']];

      console.log('interest',interest);
      console.log('totalNoPayments',totalNoPayments);
      let mortgagepayment = (principle*interest*Math.pow(1 + interest,totalNoPayments))/(Math.pow(1 + interest,totalNoPayments))-1;
      console.log('mortgagepayment',mortgagepayment);

      this.no_of_Payments = totalNoPayments;
      this.info[0].amortization = mortgagepayment;
      this.info[1].amortization = principle;
      this.info[2].amortization = (mortgagepayment*totalNoPayments) -principle;
      this.info[3].amortization = mortgagepayment*totalNoPayments;
  }
  getInfo(){
    return this.info;
  }
  submit() {
    console.log(this.mortgageCal.value)
  }
}


export class Info{
  category: string;
  term: number;
  amortization: number;
}
