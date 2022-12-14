import { Component, OnInit } from '@angular/core';
import { db } from 'src/utils/firebase';
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import FirebaseMethods from 'src/utils/firebaseMethods';
import { getAuth } from 'firebase/auth';
// import { Tour } from '../models/tour.model';
import { FormControl, FormGroup, Validators ,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  tours: any = null;
  alert:boolean = false;
  loginForm!: FormGroup;
  total: number = 0;
     
  constructor(private firebaseMethods: FirebaseMethods, private fb: FormBuilder) {
    this._createForm()
  }
  private recalculateTotal(): void {
    if (!this.tours || this.tours.length === 0) {
        return;
    }

    const total = this.tours.reduce((sum:number, tour:{price:number}) => sum + tour.price, 0);
    this.total = total;
}
  private _createForm() {
    this.loginForm = this.fb.group({
      card: ['', Validators.required],
    })
  }
  async ngOnInit(): Promise<void> {
    const auth = getAuth().onAuthStateChanged(async (user) => {
      console.log(user);
      const q = query(collection(db, "cart"), where("uid", "==", user?.uid));
      const toursSnapshot = await getDocs(q)
      const tours: {
        id: string;
        title: any;
        price: any;
        description: any;
        picture: any;
        user_uid: string;
      }[] = [];
      toursSnapshot.forEach((doc) => {
        const data = doc.data();
        tours.push({
          id: doc.id,
          title: data['title'],
          price: data['price'],
          description: data['description'],
          picture: data['picture'],
          user_uid:data['user_uid']
        });
      });
      this.tours = tours;
      this.recalculateTotal();
      console.log(this.tours);
    }
      );
  }
  get _card() {
    return this.loginForm.get('card')
  }
  async closeAlert(){
    this.alert = false
  }
  async activeAlert(){
    this.alert = true
  }
  

  async deleteFromCart(id: string){
    const auth = getAuth().onAuthStateChanged(async (user) => {
    const idx = this.tours.findIndex((x: { id: string; }) => x.id == id)
    
    console.log(id, this.tours,idx, user);
    
    if (idx != -1) {
      const Tour = {...this.tours[idx], uid:user?.uid}
      await this.firebaseMethods.removeDocument('cart', Tour.id)
      this.tours.splice(this.tours.id, 1,)
      this.recalculateTotal();
    }
    });
    
  }
}
