import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { VpostServiceService } from 'src/app/core/service/vpost-service.service';
import { ModalService } from 'src/app/_modal';
import { MessageService } from 'src/app/core/service/message.service';
import { LocalStorageService } from 'src/app/core/service/local-storage.service';

@Component({
  selector: 'app-gallery-postcards',
  templateUrl: './gallery-postcards.component.html',
  styleUrls: ['./gallery-postcards.component.css']
})
export class GalleryPostcardsComponent implements OnInit, AfterViewInit {
 
  @ViewChild("canvasEl") canvasEl: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;

  text = '';
  downloadLink = '';
  gallery: any[];
  actualItem: any;
  section:any;
  imageURL:any;
  imageToSend:any;
  pre:boolean;
  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    public enviromentVariable: EnviromentVariableServiceService,
    private postalService: VpostServiceService,
    private modalService: ModalService,
    private MessageService: MessageService,
    private localStorage: LocalStorageService
  ) {
    this.imageToSend = new Image;
    this.pre = false;
    this.actualItem = {
      imagen: '',
    }
    this.gallery = [];
    activateRoute.params.subscribe(
      data => {
        if (data.id) {
          this.initGallery(data.id)
          this.section = JSON.parse(localStorage.getItem('section'));
          
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
    if(id==='custom-modal-edition'){
      this.text=''
      document.getElementById('canvas').style.display = 'none'
      document.getElementById('img').style.display = 'block'
      document.getElementById('moveable').style.display = 'block'
      document.getElementById('mail').style.display = 'none';
    }
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
    this.imageToSend = new Image;
    this.modalService.open(id);
    this.imageURL=this.config.serverNodeLocation+'images/2/'+this.getSection()+'/'+this.actualItem.imagen+'/postcards/none';
  }
  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'postcards';
    this.initSections()
    this.dragElement(document.getElementById("moveable"));
   
  }

  ngAfterViewInit(): void {
    this.context = this.canvasEl.nativeElement.getContext("2d");  
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
   this.text= '';
   document.getElementById('canvas').style.display = 'none';
   document.getElementById('img').style.display = 'block';
   document.getElementById('moveable').style.display = 'block';
   document.getElementById('moveable').style.overflowX = '0';
   document.getElementById('moveable').style.overflowY = '0';
   document.getElementById('mail').style.display = 'none';
 }

 preview(){
  const font = document.getElementById('textBox').style.fontSize.valueOf() + ' ' + document.getElementById('textBox').style.fontFamily.valueOf();
  const img = new Image();
  img.src = this.imageURL;
  img.crossOrigin= 'anonymous'
  const newW =  document.getElementById('img').offsetWidth;
  const newH = document.getElementById('img').offsetHeight;
  // clear canvas
  this.context.clearRect(0, 0, newW,newH);
  // styles
  const w = document.getElementById('moveable').offsetLeft;
  const h = document.getElementById('moveable').offsetTop;
  document.getElementById('canvas').style.display = 'block';
  document.getElementById('img').style.display = 'none';
  document.getElementById('moveable').style.overflowX = '0';
  document.getElementById('moveable').style.overflowY = '0';
  document.getElementById('moveable').style.display = 'none';
  // canvas
  this.canvasEl.nativeElement.height = newH;
  this.canvasEl.nativeElement.width = newW;
  this.context.font = font;
  const t = this.text;
  const ctx = this.context;
  const cvs=this.canvasEl;
  img.onload = function() {
    ctx.drawImage(img, 0, 0, newW, newH);
    ctx.fillText(t, w, h);
    var imgTag = document.getElementById('img_Canvas') as HTMLImageElement;
    var dataURL = cvs.nativeElement.toDataURL('image/jpeg');
    imgTag.src = dataURL;
    //document.getElementById('face').innerHTML= '  <a  id="face" class="btn facebook" [href]="enviromentVariable.getFacebook('+imgTag.src+')" target="_blank"> <i class="fa fa-facebook"></i> </a>'
  }
  this.pre = true;
}
 

  send(){
    document.getElementById('mail').style.display = 'block';
    console.log(!this.pre)
    if(this.pre == false){
      this.preview();
    }
    

     }

 
 contactForm(form) {
   form.image=this.canvasEl.nativeElement.toDataURL('image/jpeg'); 
  this.MessageService.sendMessage(form).subscribe(
    data => {
      if (data)
        alert('Se ha enviado el correo exitosamente')
    }, err => {
      alert('Error al enviar el correo')
    }
  );
  }

}
