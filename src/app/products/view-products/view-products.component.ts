import { Component, OnInit,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit  {

  productId:string=''
  constructor(private viewactivatedRoute:ActivatedRoute,private api:ApiService){}

  product:any={}

 ngOnInit(): void {
   this.viewactivatedRoute.params.subscribe((data:any)=>{
    console.log(data.id);
    this.productId=data.id;
   })
   this.api.viewproduct(this.productId).subscribe((result)=>{
    console.log(result);
    this.product=result;
    
   },
   (result:any)=>{
    console.log(result.error);
    
   }
   )
 }
addtowishlist(){
  const {id,title,price,image}= this.product
  //api call
  this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result)

  },
  (result:any)=>{
    alert(result.error)
  }
  )
}
addtocart(product:any){
  //add quantity 
  Object.assign(product,{quantity:1})
  console.log(product);

  this.api.addtocart(product).subscribe((result:any)=>{
    this.api.cartcount()
    alert(result)
  },
  (result:any)=>{
    alert(result.error)

  }
  )
  
}
}
