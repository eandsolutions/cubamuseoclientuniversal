import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { VpostServiceService } from 'src/app/core/service/vpost-service.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-gallery-postcards',
  templateUrl: './gallery-postcards.component.html',
  styleUrls: ['./gallery-postcards.component.css']
})
export class GalleryPostcardsComponent implements OnInit {
 
  @ViewChild("canvasEl") canvasEl: ElementRef;
  private context: CanvasRenderingContext2D;
 
  cropperRes: string;
  text = '';
  downloadLink = '';
  gallery: any[];
  height :any;
  width: any;
  actualItem: any;
  section:any;
  imageURL:any;
  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    public enviromentVariable: EnviromentVariableServiceService,
    private postalService: VpostServiceService,
    private modalService: ModalService
  ) {
    this.actualItem = {
      imagen: '',
    }
    this.gallery = [];
    activateRoute.params.subscribe(
      data => {
        if (data.id) {
          this.initGallery(data.id)
          this.section = JSON.parse(window.localStorage.getItem('section'));
          
        }
      }
    )
  }

  initGallery(id: number) {
    this.postalService.getVposts(id).subscribe(
      (data: any) => {
        this.gallery = data;

      }, err => {

      }
    )
  }

  initSections() {
    this.postalService.getVpostCategories().subscribe(
      (data: any[]) => {
        this.enviromentVariable.sections = data;
        this.enviromentVariable.link = { path: '/gallery-postcards' }
      }, err => {
        console.log(err)
      }
    )
  }

  getSection() {
    let data: any = this.enviromentVariable.getSection()
    if (data == 0) {
      return 0
    } else {
      return JSON.parse(data).nombre
    }

  }

  next() {
    for (let i = 0; i < this.gallery.length; i++) {
      const element = this.gallery[i];
      if (element.idPostal == this.actualItem.idPostal) {
        if (i + 1 < this.gallery.length){
          this.actualItem = this.gallery[i + 1];
        }        
        else {
          this.actualItem = this.gallery[0]
        }
        break;
      }
    }
  }

  prev() {
    for (let i = 0; i < this.gallery.length; i++) {
      const element = this.gallery[i];
      if (element.idPostal == this.actualItem.idPostal) {
        if (i > 0) {
          this.actualItem = this.gallery[i - 1];
        }
        else {
          this.actualItem = this.gallery[this.gallery.length - 1]
        }
        break;
      }
    }
  }

  closeModal(id: string) {
    if (!this.modalService.widht)
      this.modalService.widht = '900px';
    this.modalService.close(id);
  }

  openModal(id: string, actual: any) {
    if (actual) {
      this.actualItem = actual;
      this.modalService.widht = '900px'
    } else {
      this.modalService.widht = null
    }
    this.modalService.open(id);
  }

  openEditDialog(id: string, actual: any){
    if (actual) {
      this.actualItem = actual;
      this.modalService.widht = '900px'
    } else {
      this.modalService.widht = null
    }
    this.modalService.open(id);
    this.imageURL=this.config.serverNodeLocation+'images/2/'+this.getSection()+'/'+this.actualItem.imagen+'/postcards/none';
    console.log(this.imageURL)
  }
  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'postcards';
    this.initSections()
    this.dragElement(document.getElementById("moveable"));
   
  }

  ngAfterViewInit(): void {
    this.context = (this.canvasEl
      .nativeElement as HTMLCanvasElement).getContext("2d");
    
  }


  fontType(type:string){

    switch(type){
      case "Nerko_One":
        return document.getElementById('textBox').style.fontFamily="Nerko_One";
        break;
      case "Times New Roman":
        return document.getElementById('textBox').style.fontFamily="'Times New Roman', Times, serif";
        break;
      case "Dancing Script":
        return document.getElementById('textBox').style.fontFamily="Dancing Script";
        break;
      case "Open Sans":
        return document.getElementById('textBox').style.fontFamily= "Open Sans, sans-serif";
        break;
      case "East_Sea":
        return document.getElementById('textBox').style.fontFamily= "East_Sea";
        break;
    }
  }
  
  fontSize(size:any){
    switch(size){
      case "10":
        return document.getElementById('textBox').style.fontSize="10px";
        break;
      case "12":
        return document.getElementById('textBox').style.fontSize="12px";
        break;
      case "14":
        return document.getElementById('textBox').style.fontSize="14px";
        break;
      case "16":
        return document.getElementById('textBox').style.fontSize="16px";
        break;
      case "18":
        return document.getElementById('textBox').style.fontSize="18px";
        break;
      case "24":
        return document.getElementById('textBox').style.fontSize="24px";
        break;
      case "30":
        return document.getElementById('textBox').style.fontSize="30px";
        break;
      case "40":
        return document.getElementById('textBox').style.fontSize="40px";
        break;
    }
  }

  onChange(event) {
    var c= event.target.value;
    document.getElementById('textBox').style.color=c;
  }

  dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "_header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

 reset(){
   document.getElementById('textBox').removeAttribute('style');
   
 }

 preview(src: string){
  this.context.clearRect(0, 0, (this.canvasEl.nativeElement as HTMLCanvasElement).width, (this.canvasEl.nativeElement as HTMLCanvasElement).height);
    const img = new Image();
  img.src = src;
  img.onload = () => {
    const newW = img.width > 700 && img.height > 700 ? img.width / 3 : img.width;
    const newH = img.height > 700 && img.width > 700 ? img.height / 3 : img.height;
    (this.canvasEl.nativeElement as HTMLCanvasElement).width = newW;
    (this.canvasEl.nativeElement as HTMLCanvasElement).height = newH;
    this.context.font = "30px Arial";
    this.context.textBaseline = "middle";
    this.context.textAlign = "center";
    this.context.drawImage(img, 0, 0, newW, newH);
    this.context.fillText(this.text, newW / 2, newH / 2);
    this.downloadLink = this.canvasEl.nativeElement.toDataURL("image/jpg");
    }
    console.log(this.text)
    }
 
    saveImg() {
      this.preview(this.cropperRes);
    }
 send(){

 }

}
