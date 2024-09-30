import { Component } from '@angular/core';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})


export class CrudComponent {
  saludo:string = 'HOla';
  newItem:string = '';
  editingIndex: number | null = null;
  editingItem: string = '';

  items:Item[] = [
    {id:1,name:"Item 1"},
    {id:2,name:"Item 2"}
  ]

  async addItem(){
    if (this.newItem.trim()) {
      const newId = Math.max(...this.items.map(item => item.id), 0) + 1;
      this.items.push({id:newId,name:this.newItem.trim()});
      this.newItem = '';
    }
  }

  async editItem(){
    console.log("edit");
    
  }

  async deleteItem(index:number){
    console.log("delete");
    
  }

  async findItem(index:number){
    this.editingIndex = index;
    this.editingItem = this.items[index].name;
  }


}
