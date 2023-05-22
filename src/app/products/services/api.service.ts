import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //to hold search value
  searchTerm=new BehaviorSubject('')
  //to hold cart count
  cartitemcount = new BehaviorSubject(0)

  constructor(private http:HttpClient) {
    this.cartcount()
   }
BASE_URL='http://localhost:5000'
  //api call for get all products
  getallproducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }
  viewproduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
  }
//api call for add to wishlist
addtowishlist(id:any,title:any,price:any,image:any){
  const body={
    id,title,price,image
  }
return this.http.post(`${this.BASE_URL}/wishlist/add-to-wishlist`,body)
}
//get all items from wishlist
getwishlistitems(){
  return this.http.get(`${this.BASE_URL}/wishlist/get-wishlist`)
}
//remove item from wishlist
removewishlistitem(id:any){
  return this.http.delete(`${this.BASE_URL}/wishlist/remove-wishlist-item/${id}`)
}
//add to cart
addtocart(product:any){

  const body={
    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image,
    quantity:product.quantity
  }
  return this.http.post(`${this.BASE_URL}/cart/add-to-cart`,body)
}

//get cart-items
getcart(){
  return this.http.get(`${this.BASE_URL}/cart/get-item`)
}

cartcount(){
  this.getcart().subscribe((result:any)=>{//array of cart items
    this.cartitemcount.next(result.length);//number of item

  })
}
//remove cart item
removecartitem(id:any){
  return this.http.delete(`${this.BASE_URL}/cart/remove-item/${id}`)
}
//increment count
incrementcount(id:any){
  return this.http.get(`${this.BASE_URL}/cart/increment-count/${id}`)
}
//decrement count
decrementcount(id:any){
  return this.http.get(`${this.BASE_URL}/cart/decrement-count/${id}`)
}
}
