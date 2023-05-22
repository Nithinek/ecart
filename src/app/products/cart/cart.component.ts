import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit  {
  totalprice:number=0
  allcartitems:any=[]

  paymentstatus:boolean=false
  offerstatus:boolean=false
  discountstatus:boolean=true
  username:string=''
  housenumber:string=''
  street:string=''
  pincode:string=''
  state:string=''

  public payPalConfig?: IPayPalConfig;
  showSuccess:boolean=false
  showPaypal:boolean=false

constructor(private api:ApiService, private cartFb:FormBuilder){}
addressform=this.cartFb.group({
  username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  housenumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
  streetname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
  state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]]

})

ngOnInit(): void {
   this.initConfig();
  this.api.getcart().subscribe((result:any)=>{
    console.log(result);
    this.allcartitems=result
    //call getcarttotal
    this.getcarttotal() 
  },
  (result:any)=>{
    console.log(result.error);
    
  })
}
removecartitem(id:any){
  this.api.removecartitem(id).subscribe((result:any)=>{
    this.allcartitems=result
    this.api.cartcount()
    this.getcarttotal()
  },
  (result:any)=>{
    alert(result.error)
  }
  )
}
getcarttotal(){
  let total=0
  this.allcartitems.forEach((item:any)=>{
    total=total+item.grandTotal//total
    this.totalprice=Math.ceil(total)
  })
}
incrementcount(id:any){
this.api.incrementcount(id).subscribe((result:any)=>{
  this.allcartitems=result
  this.getcarttotal()
},
(result:any)=>{
  alert(result.error)
}
)
}

decrementcount(id:any){
  this.api.decrementcount(id).subscribe((result:any)=>{
    this.allcartitems=result
    this.getcarttotal()
  },
  (result:any)=>{
    alert(result.error)
  }
  )
  }

  submitform(){
    if(this.addressform.valid){
      this.paymentstatus=true
      console.log(this.addressform);
      this.username=this.addressform.value.username||""
      this.housenumber=this.addressform.value.housenumber||""
      this.street=this.addressform.value.streetname||""
      this.pincode=this.addressform.value.pincode||""
      this.state=this.addressform.value.state||""
    }
    else{
      alert('please provide valid details')
    }
  }
  offers(){
    this.offerstatus=true
    this.discountstatus=false
  }
 discounts(value:any){
  this.totalprice=Math.ceil(this.totalprice*(100-value)/100)
  this.discountstatus=true
 }

 makepayment(){
  this.showPaypal=true
 }
modalclose(){
this.addressform.reset()
this.showPaypal=false;
this.showSuccess=false;
this.paymentstatus=false;
}
 private initConfig(): void {
  this.payPalConfig = {
  currency: 'EUR',
  clientId: 'sb',
  createOrderOnClient: (data) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: '9.99',
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: '9.99'
            }
          }
        },
        items: [
          {
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }
        ]
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then((details:any) => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
  },
  onError: err => {
    console.log('OnError', err);
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}

}
