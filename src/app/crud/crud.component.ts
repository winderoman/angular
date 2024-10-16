import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';

interface User {
  
  full_name: string;
  mail: string;
  phone: string;
  id_user:string;
}

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})


export class CrudComponent implements OnInit {
  saludo:string = 'HOla';
  data:User[] = [];

  editingIndex: string | null = null;
  editingPhone: string = '';
  editingMail: string = '';

  full_name:string = '';
  mail:string = '';
  phone:string = '';
  response: any;

  @ViewChild('fullNameInput') fullNameInput!: ElementRef;

  constructor(private apiService:ApiService) {}

  ngOnInit() {
    this.apiService.getDataUsers().subscribe(
      (response) => {
        this.data = response;
        }
    );
  }

  onEnter() {
    this.addItem();
  }

  async addItem(){
    let newPost = {
      full_name: this.full_name,
      mail: this.mail,
      phone: this.phone,
    };
    
    this.apiService.createUser(newPost).subscribe( 
     (res) => {
       this.response = res;
       this.data.push(res);
     },
     (error:any) => {
       console.error("Error al agregar el usuario",error);
     }
    );

    this.clearInputs()
    this.fullNameInput.nativeElement.focus();
  }

  clearInputs(){
    this.full_name = ""
    this.mail = ""
    this.phone = ""
  }

  async editItem(){
    console.log("edit");
    let id_user = this.editingIndex;
    let dataUpdate = {
      "phone":this.editingPhone,
      "mail":this.editingMail,
    };

    this.apiService.updateUser(id_user,dataUpdate).subscribe( 
      (res) => {
        if (res) {
          let userIndex = this.data.findIndex(user => user.id_user === id_user)
          console.log(userIndex);
          
          if (userIndex !== -1) {
            this.data[userIndex].phone = this.editingPhone
            this.data[userIndex].mail = this.editingMail
          }
        }

        this.editingIndex = null
        this.editingMail = ''
        this.editingPhone = ''
        
      },
      (error:any) => {
        console.error("Error al eliminar el usuario",error);
      }
     );

     

  }

  onEnterEdit(){
    this.editItem()
  }

  async deleteItem(id_user:string){
    this.apiService.deleteUser(id_user).subscribe( 
      (res) => {
        this.response = res;
        this.data = this.data.filter(item => item.id_user !== id_user);
      },
      (error:any) => {
        console.error("Error al eliminar el usuario",error);
      }
     );
    
  }

  async findItem(id_user:string){
    this.editingIndex = id_user;
    let dataUser = this.data.find(user => user.id_user === id_user)
    if (dataUser) {
      console.log("usuario encontrado: ", dataUser);
      this.editingPhone = dataUser.phone;
      this.editingMail = dataUser.mail;
    }

  }


}
