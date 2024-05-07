import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ProductService} from '..//..//../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {


  isSidepanelisVisible:boolean=false;
  productObj:any={
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": ""
  }
  categoryList:any[]=[];
  productList:any[]=[];
  constructor(private productService: ProductService){

  }
  ngOnInit():void{
    console.log("ddd");
    this.getAllCategory();
    this.getProducts();
  }
  getAllCategory(){
    this.productService.getCategory().subscribe((res:any)=>{
     
       this.categoryList=res.data;
    });
  }
  openSidePanel(){
    this.isSidepanelisVisible = true;
  }
  closeSidePanel(){
    this.isSidepanelisVisible = false;
  }
  OnSave(){
    this.productService.saveProducts(this.productObj).subscribe((res:any)=>{
      debugger;
      if(res.result){
        alert("Product Created");
        this.getProducts();
      }else{
        alert(res.message);
      }

    });

   

    }
    getProducts(){
      this.productService.getProducts().subscribe((res:any)=>{
        this.productList = res.data;
        console.log(res.data);
        
      })
  }
}
