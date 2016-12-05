import { Component } from '@angular/core';
import { User } from "./models/user";
import { UserService} from "./services/user.service";
import { ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';
import { BreadcrumbService } from "./services/breadcrumb.service";
import { TitleService } from "./services/title.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  private toastrConfig: ToasterConfig;
  private breadcrumb: any;
  private title: any;

  constructor(
    private _user_serv: UserService,
    private _toastr: ToasterService,
    private _bread_serv: BreadcrumbService,
    private _title_serv: TitleService
   ) {
    this.toastrConfig = new ToasterConfig({
      showCloseButton: true,
      newestOnTop: true,
      tapToDismiss: false
    });
    this._bread_serv.current.subscribe((data) => {
      this.breadcrumb = data;
    });
    this._title_serv.current.subscribe((data) => {
      this.title = data;
    })
  }

  ngOnInit(){
    //on envoi l'evenement resize, pour AdminLTE
    let ie = this.detectIE();
    if(!ie){
      window.dispatchEvent(new Event('resize'));
    }
    else{
      //solution for IE from @hakonamatata
      var event = document.createEvent("Event");
      event.initEvent("resize", false, true);
      window.dispatchEvent(event);
    }

    //envoi d'un user de test
    let user1 = new User({
      firstname: "WALTER",
      lastname: "Caroline",
      email: "test@gmail.com",
      avatar_url: "public/assets/img/user2-160x160.jpg"
    });
    this._user_serv.setCurrentUser( user1 );

  }

  detectIE(): any{
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …
    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    // IE 12 / Spartan
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
    // Edge (IE 12+)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

}