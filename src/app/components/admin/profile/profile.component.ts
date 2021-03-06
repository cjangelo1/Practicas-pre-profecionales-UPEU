import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from './../../../shared/services/auth.service';
import { UserI } from './../../../shared/models/user.interface';
import { FileI} from './../../../shared/models/file.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public image: FileI;
  public currentImage = 'data:image/jpeg;base64,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';

  constructor(private authSvc:AuthService ) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({value:'',disabled:true}),
    photoURL: new FormControl('', Validators.required)
    
  }); 
  ngOnInit(): void {
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);
    });
  }

  onSaveUser(user:UserI){
    //this.authSvc.saveUserProfile(user, this.image);
    this.authSvc.preSaveUserProfile(user, this.image);
  }

  private initValuesForm(user: UserI): void{
    if(user.photoURL){
      this.currentImage=user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
    });
}
  handleImage(image : FileI): void{
    this.image = image;
  }
}
