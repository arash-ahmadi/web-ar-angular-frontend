import { Product } from './../shared/models/hack.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs/operators';

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper/core';
import { CartService } from '../services/cart.service';
// import { Product } from '../shared/models/hack.model';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: number;
  product: any;
  quantity: number;
  showcaseImages: any[] = [];
  loading = false;
  private sub;

  constructor(
    private _route: ActivatedRoute,
    private _product: ProductService,
    private _cart: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    // this._route.paramMap
    //   .pipe(
    //     map((param: any) => {
    //       return param.params._id;
    //     })
    //   )
    //   .subscribe((productId) => {
    //     console.log(productId)
    //     // returns string so convert it to number
    //     this.id = parseInt(productId);
    //     this._product.getSingleProduct(productId).subscribe((product) => {
    //       console.log(product);
    //       this.product = product;
    //       if (product.quantity === 0) this.quantity = 0;
    //       else this.quantity = 1;

    //       if (product.images) {
    //         this.showcaseImages = product.images.split(';');
    //       }
    //       this.loading = false;
    //     });
    //   });

    //Taking params from route 
      this._route.params
      .subscribe(res => {
        this.getProduct(res.industry, res._id);
      }) 
  }

  getProduct = (industry, id) => {
    // this.sub = this.productService.getProducts('http://localhost:5000/api/v1/Furniture/'+id)
    //     .subscribe(res => {
    //         this.product = res.Product;
    //         // console.log(res)
    //     })
    this.sub = this._product.getProducts('http://localhost:5000/api/v1/'+industry+'/'+id).subscribe(
        res=>{
          this.product = res.Product
          this.loading = false
          // console.log(this.product)
        })
};

  // addToCart(): void {
  //   this._cart.addProduct({
  //     id: this.id,
  //     price: this.product.price,
  //     quantity: this.quantity,
  //     image: this.product.image,
  //     title: this.product.title,
  //     maxQuantity: this.product.quantity,
  //   });
  // }
  
}
