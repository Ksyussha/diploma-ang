import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import FirebaseMethods from 'src/utils/firebaseMethods';
import { Tour } from '../models/tour.model';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent implements OnInit {
  id: string;
  tour: Tour = new Tour();
  alert:boolean = false
  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseMethods: FirebaseMethods
  ) {
    this.id = String(activatedRoute.snapshot.paramMap.get('id'));
  }
  async ngOnInit(): Promise<void> {
    const tour: any = await this.firebaseMethods.getDocumentById(
      'tours',
      this.id
    );
    this.tour = new Tour(tour.id, tour.title, tour.price, tour.description, tour.picture,tour.date,);
    console.log(tour.date);
    
  }

  async addToCart(id: string) {
    console.log(id);
    const auth = getAuth().onAuthStateChanged(async user => {
      if (user){
              const tour = { ...this.tour, productId:this.tour.id, uid: user?.uid };
              await this.firebaseMethods.create('cart', tour);
              }
              else {
                alert("Log in first before adding an item to the cart")
              }
          });
    
  }
  async closeAlert(){
    this.alert = false
  }

}
