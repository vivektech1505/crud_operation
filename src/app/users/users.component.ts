import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//declare var $:any

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  public userForm: any;
  public users: any = [];
  public activeTabId = 1;
  public activeUserId: any = null;

  onSubmit() {
    console.log(this.userForm.value, this.activeUserId);

    this.service
      .AddUpdateUser(this.userForm.value, this.activeUserId)
      .subscribe({
        next: (resp) => this.handleSuccess(resp),
        error: (error) => this.handleError(error),
      });

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

  handleSuccess(resp: any) {
    console.log('User updated', resp);

    const name = this.userForm.value.name;
    const status = this.activeTabId ? 'Updated' : 'Saved';

    Swal.fire({
      icon: 'success',
      title: `User ${name} ${status} Succesfull!`,
    });

    this.userForm.reset();
    this.getAllUsers();
  }

  handleError(error: any) {
    Swal.fire({
      icon: 'error',
      title: error.statusText,
    });
  }

  getAllUsers() {
    console.log('Sbmitting Form', this.userForm.value);
    this.service.getAllUsers().subscribe((data) => {
      console.log('users', data);
      this.users = data;
    });
  }
  deleteConformation(id: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete the user?',

      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUserById(id);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  deleteUserById(id: any) {
    this.service.deleteUserById(id).subscribe((data) => {
      Swal.fire('Deleted!', '', 'success');
      this.getAllUsers();
      console.log(data);
    });
  }

  editUserById(id: any) {
    this.service.editUserById(id).subscribe((data) => {
      // alert("User Deleted");
      // this.getAllUsers();
      //alert("edit users successfull");
      Swal.fire('Edited Mode!', '', 'success');
      console.log('User Details', data);

      // this.userForm.patchValue({
      //   name: ([data.name,Validators.required]),
      //   mobile : data.mobile,
      //   email : data.email,
      //   age : data.age

      // })
      this.activeTabId = 1;
      this.activeUserId = id;
      this.router.navigate(['/users'], { queryParams: { id } });
      this.userForm.patchValue(data);
    });
  }

  constructor(
    public fb: FormBuilder,
    private service: CommonService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: [''],
      mobile: [''],
      email: [''],
      age: [''],
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
}
