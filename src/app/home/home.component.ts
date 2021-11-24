import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Products, Product } from '../shared/models/hack.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  industry:string;
    category:string;
    private sub;
    showCategory:any = false;
  subCategories: any[]
  categories: any[] = [
    {
      name: 'Furniture',
      img: '../../assets/furniture_industry.jpg',
      industry: 'furniture'
    },
    {
      name: 'Fashion',
      img: '../../assets/fashion_industry.jpg',
      industry: 'fashion'
    },
    {
      name: 'Machinery',
      img: '../../assets/machinery_industry.jpg',
      industry: 'machinery'
    }
    
  ];

  subCategoriesFashion: any[] = [
    {
      name: 'Footwear',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/footwear.png'
    },
    {
      name: 'Handbags',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/handbags.png'
    },
    {
      name: 'Menswear',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/menswear.png'
    },
    {
      name: 'Womenswear',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/womenswear.png'
    },
  ]

  subCategoriesFurniture: any[] = [
    {
      name: 'Rack',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/rack.png'
  },
  {
      name: 'Sofa',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/sofa.png'
  },
  {
      name: 'Set',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/set.png'
  },
  {
      name: 'Cubicle',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/cubicle.png'
  },
  {
      name: 'Table',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/table.png'
  },
  {
      name: 'Chair',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/chair.png'
  },
  {
      name: 'Lounge',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/lounge.png'
  },
  {
      name: 'Large Seater',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/large-seater.png'
  },
  {
      name: 'Lamp',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/lamp.png'
  },
  {
      name: 'Hearth',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/hearth.png'
  },
  {
      name: 'Living Room',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/living-room.png'
  },
  {
      name: 'Mood Board',
      img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/mood-board.png'
  }
  ]

  subCategoriesMachinery: any[] = [
    
      {
        name: 'Printer',
        img: 'https://tulanedigcontent.blob.core.windows.net/web-ar-demo/icons/printer.png'
      }
    
  ]
  
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) {}

  public screenWidth: any;
  public screenHeight: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.loading = true;
    
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);

    //Hack Products API Call
    this.showCategory = false;
    this.getIndustry()
    this.getCategory()
    this.load() 
   
  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = [...this.products, ...res];
          this.additionalLoading = false;
        },
        (err) => {
          console.log(err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }
  load = () => {
    //    this.sub = this.productService.getProducts('https://business-and-retail-web-ar.herokuapp.com/api/v1/Furniture/getAll')
    //         .subscribe(res => {
    //             this.products = res.Products;     
    //             console.log(this.products)    
    //         })
    if(this.category == "all")
{   
    console.log("inside if")
    this.sub = this.productService.getProducts('https://business-and-retail-web-ar.herokuapp.com/api/v1/'+this.industry+'/getAll').subscribe(
        res=>{
          this.products=res.Products;
          
        })}
        else{
            console.log("inside else")
            var query = 'https://business-and-retail-web-ar.herokuapp.com/api/v1/'+this.industry+'/'+this.category+'/getAll'
            console.log(query)
            this.sub = this.productService.getProducts(query).subscribe(
        res=>{
          this.products=res.Products;
          // console.log(this.products)
        })
        }
    };

  getIndustry(){
    if(this.route.params!==null){
        // console.log("inside if")
        this.route.params.subscribe(res => {
        if(res.industry != null){
            this.industry = res.industry
        }
        else{
            this.industry = "Furniture" 
        }
        console.log(this.industry)
    })
}
}
getCategory(){
    if(this.route.params!==null){
        this.route.params.subscribe(res => {
        if(res.category != null){
            console.log("setting category")
            this.category = res.category
        }
        else{
            this.category = "all" 
        }
        
    })
}
}
getCategoriesByIndustry(industry){
  if(industry == "Fashion"){
      this.subCategories=this.subCategoriesFashion;   
    }
    else if (industry =="Furniture"){
      this.subCategories=this.subCategoriesFurniture;
    }
    else if (industry =="Machinery"){
      this.subCategories=this.subCategoriesMachinery;
    }
}
industrySelect(industry,category){
  this.showCategory = true;
  this.industry = industry;
  this.category = category;
  this.getCategoriesByIndustry(industry)
 
  this.load()
}
categorySelect(category){
  this.category = category;
  this.load()
}
}
