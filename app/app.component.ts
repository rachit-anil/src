import { Component } from '@angular/core';
import { GoogleDriveService } from './google-drive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly googleDriveService:GoogleDriveService){

  }

  signIn(){
    
  }
}
