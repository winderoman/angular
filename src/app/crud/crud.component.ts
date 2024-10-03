import { Component,OnInit } from '@angular/core';
import { ApiService } from '../api.service';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})


export class CrudComponent implements OnInit {
  saludo:string = 'HOla';
  data:any[] = [];
  newItem:string = '';
  editingIndex: number | null = null;
  editingItem: string = '';

  items:Item[] = [
    {id:1,name:"Item 1"},
    {id:2,name:"Item 2"}
  ]

  newPost = {
    full_name: 'tyga',
    mail: 'tyga@pepe.co',
    phone: '3215459631',
  };
  response: any;

  constructor(private apiService:ApiService) {}

  ngOnInit() {
    this.apiService.getDataUsers().subscribe(
      (response) => {
        this.data = response;
        console.log(this.data);
      }
    );
  }

  onEnter() {
    this.addItem();
  }

  async addItem(){
    this.apiService.createUser(this.newPost).subscribe((res) => {
      this.response = res;
      console.log(this.response);
      
    });

    
  }

  async editItem(){
    console.log("edit");
  }

  onEnterEdit(){
    this.editItem()
  }

  async deleteItem(id:number){

  }

  async findItem(id:number){

  }


}
