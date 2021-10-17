import { NgxScrollEvent } from 'ngx-scroll-event';
import { SearchServiceService } from './../../core/service/search-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { CollectionServiceService } from 'src/app/core/service/collection-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', './search.component.scss']
})


export class SearchComponent implements OnInit {

  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowsScroll($event: Event) {
    let srcElement: any = $event.srcElement
    let scrollOffset = srcElement.children[0].scrollTop;
    let max = document.documentElement.scrollHeight;
    if (scrollOffset >= (max - 1000)) {
      this.hScroll();
    }
  }

  query: string;
  isCollection: boolean;
  isModel: boolean;
  isStamp: boolean;
  isVPost: boolean;
  isShop: boolean;
  isItem: boolean;

  shopList: any[];
  collectionList: any[];
  modelList: any[];
  stampList: any[];
  vpostList: any[];
  itemList: any[];
  itemCategoryList: any[];

  limitCollection: number;
  limitStamp: number;
  limitModel: number;
  limitShop: number;
  limitItem: number;

  actualTab: string;

  constructor(private activatedRoute: ActivatedRoute,
    private searchService: SearchServiceService,
    public config: ConfigServiceService,
    private collectionService: CollectionServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    private route: Router
  ) {

    this.isCollection = true;
    this.isModel = true;
    this.isStamp = true;
    this.isVPost = false;
    this.isShop = false;
    this.isItem = true;

    this.shopList = [];
    this.collectionList = [];
    this.modelList = [];
    this.stampList = [];
    this.vpostList = [];
    this.itemList = [];
    this.itemCategoryList = [];

    this.limitCollection = 10;
    this.limitModel = 10;
    this.limitStamp = 10;
    this.limitShop = 10;
    this.limitItem = 10;

    this.actualTab = 'collection';

    this.query = "";
    this.initSections()
    this.activatedRoute.params.subscribe(val => {
      if (val.query) {
        this.query = val.query;
        this.search()
      }
    });
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true)
  }

  initSections() {
    this.collectionService.getCollectionsSections().subscribe(
      (data: any[]) => {
        this.enviromentVariable.sections = data;
        this.enviromentVariable.link = { path: '/superior-collection' }
      }, err => {
        console.log(err)
      }
    )
  }

  toSearch() {
    this.route.navigate(['search', this.query])
  }

  search() {
    if (this.query != '') {
      //this.searchInShop();
      this.searchInStamp();
      this.searchInModel();
      this.searchIInCollectionsSection();
      //this.searchInItems();
    }

  }

  searchInShop() {
    this.shopList = [];
    this.searchService.findInShop(this.query).subscribe(
      (data: any[]) => {
        data.forEach(element => {
          this.shopList.push(element)
        });
      }, error => {

      }
    )
  }

  searchInText() {
    this.searchService.findInText(this.query).subscribe(
      (data: any[]) => {
        data.forEach(element => {

        });
      }, error => {

      }
    )
  }

  searchInModel() {
    this.modelList = [];
    if (this.isModel)
      this.searchService.findInModel(this.query).subscribe(
        (data: any[]) => {
          if(data.length >0)
            this.actualTab = 'model'
          data.forEach(element => {
            this.modelList.push(element);
          });
        }, error => {

        }
      )
  }

  searchInStamp() {
    this.stampList = [];
    if (this.isStamp)
      this.searchService.findInStamp(this.query).subscribe(
        (data: any[]) => {
          if(data.length >0)
            this.actualTab = 'stamp'
          data.forEach(element => {
            this.stampList.push(element);
          });
        }, error => {

        }
      )
  }

  searchInCollectionsCategory() {
    console.log('entro a category')
    if (this.isCollection)
      this.searchService.findInCollectionsCategory(this.query).subscribe(
        (data: any[]) => {
          console.log('data is here');
          console.log(data)
          data.forEach(element => {
            this.collectionList.push(element)
          });
        }, error => {

        }
      )
  }

  searchInItems() {
    this.itemList = [];
    if (this.isItem)
      this.searchService.findInItem(this.query).subscribe(
        (data: any[]) => {
          data.forEach(element => {
            this.itemList.push(element)
          });
          if (this.itemList.length > 0) {
            this.itemCategoryList = [];
            this.itemList.forEach(element => {
              this.searchService.findCollectionByItem(element.idItem).subscribe(
                (data: any) => {
                  if (data.length > 0)
                    this.itemCategoryList.push(data[0]);
                }, error => {

                }
              )
            });
          }
        }, error => {

        }
      )
  }

  searchIInCollectionsSection() {
    this.collectionList = [];
    if (this.isCollection)
      this.searchService.findInCollectionsSection(this.query).subscribe(
        (data: any[]) => {
          data.forEach(element => {
            this.collectionList.push(element);
          });
          this.searchInCollectionsCategory();
        }, error => {

        }
      )
  }

  redirectCollection(item) {
    if (item.idSeccion) {
      this.route.navigate(['/superior-collection/search', item.idSeccion, this.query])
    }

    if (item.idCategoria) {
      this.route.navigate(['/inferior-collection/search', item.idCategoria, this.query])
    }

  }

  redirectSamples(item) {
    this.route.navigate(['/inferior-samples/search', item.idMuestra, this.query])
  }

  redirectStamp(item) {
    this.route.navigate(['/inferior-stamp/search', item.idEstampa, this.query])
  }

  cleanString(data: string) {
    let res = "";
    let finded = false;
    if (data) {
      res = data;
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        if (element.toLowerCase() == this.query[0].toLowerCase()) {
          let part = res.slice(i, i + this.query.length)
          if (part.toLowerCase() == this.query.toLowerCase()) {
            if (i > 20) {
              let aux = res.slice(this.findWhiteSpaceAfter(i, res), i + 200).replace(part, '<span style="color: #ffda43">' + part + '</span>')
              if (aux.slice(0, 4) == 'src') {
                i += this.query.length
              } else {
                finded = true;
                res = aux;
                break;
              }
              //res = res.replace(part,'<span>' + part + '</span>')
            }
            else {
              finded = true;
              res = res.slice(i, this.findWhiteSpaceAfter(250, res)).replace(part, '<span style="color: #ffda43">' + part + '</span>');
              break;
            }

            //res = res.replace(part,'<span>' + part + '</span>')
          }
        }
      }

      if (!finded)
        res = res.slice(0, this.findWhiteSpaceAfter(250, res));

    }

    return res;
  }

  findWhiteSpaceAfter(actualPoss, text) {
    let poss = 0;
    for (let i = actualPoss; i > 0; i--) {
      const element = text[i];
      if (element == " ") {
        poss = i;
        break;
      }
    }
    return poss;
  }

  hScroll() {

    if (this.actualTab == 'collection') {
      if ((this.collectionList.length - this.limitCollection) > 0) {
        if ((this.collectionList.length - this.limitCollection) <= 10)
          this.limitCollection += this.collectionList.length - this.limitCollection;
        else
          this.limitCollection += 10;
      }
    } else if (this.actualTab == 'stamp') {
      if ((this.stampList.length - this.limitStamp) > 0) {
        if ((this.stampList.length - this.limitStamp) <= 10)
          this.limitStamp += this.stampList.length - this.limitStamp
        else
          this.limitStamp += 10;
      }
    } else if (this.actualTab == 'model') {
      if ((this.modelList.length - this.limitModel) > 0) {
        if ((this.modelList.length - this.limitModel) <= 10)
          this.limitModel += this.modelList.length - this.limitModel
        else
          this.limitModel += 10;
      }
    } else if (this.actualTab == 'shop') {
      if ((this.shopList.length - this.limitShop) > 0) {
        if ((this.shopList.length - this.limitShop) <= 10)
          this.limitShop += this.shopList.length - this.limitShop;
        else
          this.limitShop += 10;
      }
    }
  }

  scroll = (event: any): void => {
    this.doSomethingOnWindowsScroll(event)
  }

  routeItem(idItem) {
    let id = 0;
    for (let i = 0; i < this.itemCategoryList.length; i++) {
      const element = this.itemCategoryList[i];
      if (element.idItem == idItem)
        id = element.idCategoria
    }
    if (id != 0)
      this.route.navigate(['/inferior-collection/', id, idItem])
  }

  equalLength(arr:any[]){
    console.log(arr.length);
    if(arr.length == 0)
      return false;
    return true;
  }

}
