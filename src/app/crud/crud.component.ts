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

  constructor(private apiService:ApiService) {}

  ngOnInit() {
    this.apiService.getDatos().subscribe(
      (response) => {
        this.data = response;
        console.log(this.data);
      },
      (error) => {
        console.error('Error in data collection');
      }
    );
  }

  onEnter() {
    this.addItem();
  }

  async addItem(){
    if (this.newItem.trim()) {
      const newId = Math.max(...this.items.map(item => item.id), 0) + 1;
      this.items.push({id:newId,name:this.newItem.trim()});
      this.newItem = '';
    }
  }

  async editItem(){
    console.log("edit");
    if (this.editingIndex !== null && this.editingItem.trim()) {
      this.items[this.editingIndex].name = this.editingItem;
      this.editingIndex = null
      this.editingItem = '';
    }
  }

  onEnterEdit(){
    this.editItem()
  }

  async deleteItem(index:number){
    console.log("delete");
    this.items.splice(index,1);
  }

  async findItem(index:number){
    this.editingIndex = index;
    this.editingItem = this.items[index].name;
  }


}
