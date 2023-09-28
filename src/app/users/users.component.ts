import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//declare var $:any

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userForm: any;
  users: any;

  onSubmit() {
    console.log(this.userForm.value)
//     if(this.userForm.value.name) {
//     var type = this.userForm.value.id==null? 'Add' : 'Update'
//     console.log('Sbmitting Form',this.userForm.value);
//     this.service.AddUpdateUser(this.userForm.value,type).subscribe(data =>{
//       if(type=='Add') {
//         Swal.fire({
//           icon: 'success',
//           title: 'User '+this.userForm.value.name+' Saved Succesfull!',
//         })
//       }
//       else{
//         Swal.fire({
//           icon: 'success',
//           title: 'User '+this.userForm.value.name+' Updated Succesfull!',
//         })
//       }
//       this.userForm.reset();
//       console.log(data)
//       this.getAllUsers();
//     })
//   } else {
//     Swal.fire({
//       icon: 'error',
//       title: 'plz Add user Information ',
//     })
//   }
  }
  getAllUsers() {
    console.log('Sbmitting Form',this.userForm.value);
    this.service.getAllUsers().subscribe(data =>{
      console.log('users',data);
      this.users = data;
    })
  }
  deleteConformation(id:any) {
    Swal.fire({
      icon : 'warning',
      title: 'Do you want to delete the user?',
      
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Don't save`,
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.deleteUserById(id)
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  deleteUserById(id:any) {
    this.service.deleteUserById(id).subscribe(data =>{
      Swal.fire('Deleted!', '', 'success')
      this.getAllUsers();
      console.log(data);
    })
  }

  editUserById(id:any) {
    this.service.editUserById(id).subscribe(data =>{
      // alert("User Deleted");
      // this.getAllUsers();
      //alert("edit users successfull");
      Swal.fire('Edited Mode!', '', 'success')
      console.log("User Details", data);
      
      // this.userForm.patchValue({
      //   name: ([data.name,Validators.required]),
      //   mobile : data.mobile,
      //   email : data.email,
      //   age : data.age

      // })
      this.active = 1;
      this.router.navigate(['/user'], {queryParams: { id }})
      this.userForm.patchValue(data)
    })
  }

  constructor(public fb : FormBuilder, private service: CommonService, private router: Router) {
    this.userForm = this.fb.group({
      name : [""],
      mobile : [""],
      email : [""],
      age : [""]
    })
  }
  active = 1;
  ngOnInit() : void {
    this.getAllUsers();
  }
}
