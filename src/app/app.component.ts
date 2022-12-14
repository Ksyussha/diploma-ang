import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { getAuth, signOut } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.components.css']
})
export class AppComponent {
  title = 'a-frontend';
  isMenuOpen = false;


  logOut(){
    const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  }
  toggleMenu():void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
}

