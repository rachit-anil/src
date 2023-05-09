import { Component, NgZone } from '@angular/core';
import { GoogleDriveService } from '../google-drive.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

declare var google: any;

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {
  constructor(private readonly googleDriveService: GoogleDriveService,
    private http: HttpClient,
     private ngZone: NgZone){}
client:any;

  ngAfterViewInit() {
    // this.authorize();
    // this.client=  google.accounts.oauth2.initCodeClient({
    //   client_id: '1026513657941-u7v0vq78qgihkk6dp149cumhroh2l1ql.apps.googleusercontent.com',
    //   scope: 'https://www.googleapis.com/auth/calendar.readonly',
    //   ux_mode: 'redirect',
    //   redirect_uri: "https://localhost:4200/",
    //   state: "YOUR_BINDING_VALUE"
    // });

 

   
    // google.accounts.id.initialize({
    //   client_id: "1026513657941-u7v0vq78qgihkk6dp149cumhroh2l1ql.apps.googleusercontent.com",
    //   callback: (window as any)['handleCredentialResponse'] = 
    //    (response: any) => this.ngZone.run(() => {
    //     console.log("this response holds the token for the logged in user information",response);
    //     this.authorize();
    //   })
    // });
  
    // google.accounts.id.renderButton(
    //   document.getElementById("googleButton"),
    //   { type: "standard", text: "signin_with", theme: "outline", 
    //   size: "medium", width: "250"}
    // )






    // https://www.googleapis.com/auth/drive
// 
  }
accessToken ='';

  //creating token client here dont change this .. returning correct access token 
  authorize(){
    this.client = google.accounts.oauth2.initTokenClient({
      client_id: '1026513657941-u7v0vq78qgihkk6dp149cumhroh2l1ql.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive',
      callback: (response:any) => {
        console.log(response);
        this.accessToken = response.access_token;
        // this.callDriveAPI(response)
      },
    });
    console.log(this.client);
    this.client.requestAccessToken();
  }
permissions:any[]=[];
  listPermissions(){
    //this one is working 
    // https://www.googleapis.com/drive/v3/files

    // body: JSON.stringify({
    //   "name": "Rachit",
    //   "mimeType" : "text/plain",
    // }),


    //Lists permissions 
    // fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,{


    // const fileId = '1YWlbj1nrAb-TsV9Py2lnisPRAt2_8jLVc6yoZqGnzmU';
    const fileId = `1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo`;
    fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?fields=*`,{
      method:'GET',
      headers :{
        'Content-Type':"text",
        'Authorization': `Bearer ${this.accessToken}`,
      },
    }).then(x=>x.json()).then(x=>{console.log(x);this.permissions = x.permissions});


    //Edit permissions 

  }

  updatePermissions(){

 //this one is working 
    // https://www.googleapis.com/drive/v3/files

    // body: JSON.stringify({
    //   "name": "Rachit",
    //   "mimeType" : "text/plain",
    // }),


    //Lists permissions 
    // fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,{


    // const fileId = '1YWlbj1nrAb-TsV9Py2lnisPRAt2_8jLVc6yoZqGnzmU';
    const fileId = `1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo`;
    const reqBody = {
      "emailAddress":"rachitmacbook@gmail.com",
      "role":"writer",
      "type":"user",
    };

    fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,{
      method:'POST',
      headers :{
        'Content-Type':"text",
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(reqBody),
    }).then(x=>x.json()).then(x=>console.log(x));


    //Edit permissions 


  }
}




//how a permission with all fields look like 
// {
// 	"kind": "drive#file",
// 	"id": "1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo",
// 	"name": "public docuemnt",
// 	"mimeType": "application/vnd.google-apps.document",
// 	"starred": false,
// 	"trashed": false,
// 	"explicitlyTrashed": false,
// 	"parents": ["1qymsodK8ojqVoh5bfL4QEaLYiryd11L-"],
// 	"spaces": ["drive"],
// 	"version": "9",
// 	"webViewLink": "https://docs.google.com/document/d/1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo/edit?usp=drivesdk",
// 	"iconLink": "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document",
// 	"hasThumbnail": true,
// 	"thumbnailLink": "https://docs.google.com/feeds/vt?gd=true&id=1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo&v=3&s=AMedNnoAAAAAZFWFuBsWV8WbhTMLvVzZQZKg4S_3LKqO&sz=s220",
// 	"thumbnailVersion": "3",
// 	"viewedByMe": true,
// 	"viewedByMeTime": "2023-05-05T20:03:25.097Z",
// 	"createdTime": "2023-05-05T17:39:56.940Z",
// 	"modifiedTime": "2023-05-05T17:40:03.591Z",
// 	"modifiedByMeTime": "2023-05-05T17:40:03.591Z",
// 	"modifiedByMe": true,
// 	"owners": [{
// 		"kind": "drive#user",
// 		"displayName": "Rachit Anil",
// 		"photoLink": "https://lh3.googleusercontent.com/a/AGNmyxbxZFlmFtDW_ct3c8tsIOoP6C2J5b92eJe6K2DV5A=s64",
// 		"me": true,
// 		"permissionId": "15082525697180219106",
// 		"emailAddress": "rachit9910102312@gmail.com"
// 	}],
// 	"lastModifyingUser": {
// 		"kind": "drive#user",
// 		"displayName": "Rachit Anil",
// 		"photoLink": "https://lh3.googleusercontent.com/a/AGNmyxbxZFlmFtDW_ct3c8tsIOoP6C2J5b92eJe6K2DV5A=s64",
// 		"me": true,
// 		"permissionId": "15082525697180219106",
// 		"emailAddress": "rachit9910102312@gmail.com"
// 	},
// 	"shared": true,
// 	"ownedByMe": true,
// 	"capabilities": {
// 		"canAcceptOwnership": false,
// 		"canAddChildren": false,
// 		"canAddMyDriveParent": false,
// 		"canChangeCopyRequiresWriterPermission": true,
// 		"canChangeSecurityUpdateEnabled": false,
// 		"canChangeViewersCanCopyContent": true,
// 		"canComment": true,
// 		"canCopy": true,
// 		"canDelete": true,
// 		"canDownload": true,
// 		"canEdit": true,
// 		"canListChildren": false,
// 		"canModifyContent": true,
// 		"canModifyContentRestriction": true,
// 		"canModifyLabels": false,
// 		"canMoveChildrenWithinDrive": false,
// 		"canMoveItemIntoTeamDrive": true,
// 		"canMoveItemOutOfDrive": true,
// 		"canMoveItemWithinDrive": true,
// 		"canReadLabels": false,
// 		"canReadRevisions": true,
// 		"canRemoveChildren": false,
// 		"canRemoveMyDriveParent": true,
// 		"canRename": true,
// 		"canShare": true,
// 		"canTrash": true,
// 		"canUntrash": true
// 	},
// 	"viewersCanCopyContent": true,
// 	"copyRequiresWriterPermission": false,
// 	"writersCanShare": true,
// 	"permissions": [{
// 		"kind": "drive#permission",
// 		"id": "06393678854545607778",
// 		"type": "user",
// 		"emailAddress": "chavvi6991@gmail.com",
// 		"role": "writer",
// 		"displayName": "Chavvi Sharma",
// 		"photoLink": "https://lh3.googleusercontent.com/a/default-user=s64",
// 		"deleted": false,
// 		"pendingOwner": false
// 	}, {
// 		"kind": "drive#permission",
// 		"id": "15082525697180219106",
// 		"type": "user",
// 		"emailAddress": "rachit9910102312@gmail.com",
// 		"role": "owner",
// 		"displayName": "Rachit Anil",
// 		"photoLink": "https://lh3.googleusercontent.com/a/AGNmyxbxZFlmFtDW_ct3c8tsIOoP6C2J5b92eJe6K2DV5A=s64",
// 		"deleted": false,
// 		"pendingOwner": false
// 	}],
// 	"permissionIds": ["06393678854545607778", "15082525697180219106"],
// 	"size": "1024",
// 	"quotaBytesUsed": "1024",
// 	"isAppAuthorized": false,
// 	"exportLinks": {
// 		"application/rtf": "https://docs.google.com/feeds/download/documents/export/Export?id=1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo&exportFormat=rtf",
// 		"application/vnd.oasis.opendocument.text": "https://docs.google.com/feeds/download/documents/export/Export?id=1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo&exportFormat=odt",
// 		"text/html": "https://docs.google.com/feeds/download/documents/export/Export?id=1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo&exportFormat=html",
// 		"application/pdf": "https://docs.google.com/feeds/download/documents/export/Export?id=1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo&exportFormat=pdf",
// 		"application/epub+zip": "https://docs.google.com/feeds/download/documents/export/Export?id=1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo&exportFormat=epub",
// 		"application/zip": "https://docs.google.com/feeds/download/documents/export/Export?id=1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo&exportFormat=zip",
// 		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": "https://docs.google.com/feeds/download/documents/export/Export?id=1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo&exportFormat=docx",
// 		"text/plain": "https://docs.google.com/feeds/download/documents/export/Export?id=1wonF2biEO7hTbs-n1FdwncRFmvesQ9xtG6bpXk6-oVo&exportFormat=txt"
// 	},
// 	"linkShareMetadata": {
// 		"securityUpdateEligible": false,
// 		"securityUpdateEnabled": true
// 	}
// }