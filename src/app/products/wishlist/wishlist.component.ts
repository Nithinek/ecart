import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  allwishlistitem:any=[]
constructor(private api:ApiService){}
ngOnInit(): void {
  this.api.getwishlistitems().subscribe((result:any)=>{
    console.log(result); 
    this.allwishlistitem=result //assign array of items
  },
  (result:any)=>{
    console.log(result.error);
    
  }
  )
}
removewishlistitem(id:any){
  this.api.removewishlistitem(id).subscribe((result:any)=>{
    console.log(result);
    this.allwishlistitem
    alert("product removed")
    
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
    this.removewishlistitem(product.id)
    alert(result)
  },
  (result:any)=>{
    alert(result.error)

  }
  )
  
}
}
