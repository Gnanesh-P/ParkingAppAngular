import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '../../node_modules/@angular/common/http';
import { MatTableDataSource  } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  displayedColumns = [ 'slotNo', 'registerNumber', 'color','action'];
  dataSource = new MatTableDataSource();
  title = 'parking-app';
  hide:boolean=false;
  slots:number;
  regNumber:string;
  vehicleColors:string;
  vehicleRegColor:string;
  registerNumbers:string;
  vehicleColor:string;
  totalSlots:number;
  vehicleNumberFromList:string;
  slotNoByColor:string;
  slotNoByReg:string;
  showTemplate:boolean=false;
  serviceUrl="https://parking-slot-app.herokuapp.com/";
  reset(){
    this.vehicleNumberFromList="";
    this.slotNoByColor="";
    this.slotNoByReg="";
  }
  constructor(private httpService:HttpClient){
  }
  ngOnInit() {
   
  }
  getvehileList(){
    this.reset();
    this.httpService.get(this.serviceUrl+"vehicleList").subscribe((d:any)=>{
      this.dataSource=new MatTableDataSource(d);
      console.log(d);
    })
  }
  getRegisterNumberByColor(){
    this.reset();
    let params = new HttpParams();
    params = params.append('vehicleColor', this.vehicleRegColor);
    this.httpService.get(this.serviceUrl+"getVehicleByColor",{params:params}).subscribe((d:any)=>{
      if(d.length==0)
       {
         alert("No vehicles found");
         return;
       }
      this.vehicleNumberFromList="Register Number vehicle  by color:"+d;
    })
  }
  getSlotNumberByColor(){
    this.reset();
    let params = new HttpParams();
    params = params.append('vehicleColor', this.vehicleColors);
    this.httpService.get(this.serviceUrl+"getParkingSlotsByColor",{params:params}).subscribe((d:any)=>{
      if(d.length==0)
       {
         alert("No vehicles found");
         return;
       }
      this.slotNoByColor="Slot number of the vehicles for the given color:"+d;
      console.log(d);
    })
  }
  getSlotNumberByRegisterNumber(){
    this.reset();
    let params = new HttpParams();
    params = params.append('registerNumber', this.registerNumbers);
    this.httpService.get(this.serviceUrl+"getSlotNumberByRegisterNumber",{params:params}).subscribe((d:any)=>{
      if(d.length==0)
       {
         alert("No vehicles found");
         return;
       }
      this.slotNoByReg="Slot number for the given register number of the vehicle:"+d;
      console.log(d);
    })
  }
  createSlots(){
    this.showTemplate=true;
    let params = new HttpParams();
    this.totalSlots=this.slots;
    var totalSlotss=this.slots.toString();
    params = params.append('slots', totalSlotss);
    this.httpService.get(this.serviceUrl+"initializeFreeSlots",{params:params}).subscribe(d=>{
        
  })
}
exitVehicle(slotNo:string){
  let params = new HttpParams();
  params = params.append('vehicleId', slotNo);
  this.httpService.get(this.serviceUrl+"exitVehicle",{
    params:params
  }).subscribe(d=>{
this.getvehileList();
})
}
entryVehicle(){
  if(this.regNumber==""||this.vehicleColor==""){
    alert("Input fields are missing");
    return;
  }
  this.httpService.post(this.serviceUrl+"entryVehicle",{
    "registerNumber":this.regNumber,
    "color":this.vehicleColor
  },{responseType:"text"}).subscribe((d:any)=>{
    this.regNumber="";
    this.vehicleColor="";
    if(d=="Parking Full")
       alert("No Parking slots available")
    this.getvehileList();
   console.log(d);

})
}
}
export interface Element {
  slotNo: number;
  registerNumber: string;
  color: string;
}

const ELEMENT_DATA: Element[] = [
];