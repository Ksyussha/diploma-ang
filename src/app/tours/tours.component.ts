import { Component, OnInit } from '@angular/core';
import FirebaseMethods from 'src/utils/firebaseMethods';
import { Tour } from '../models/tour.model';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [new Tour()];
  constructor(private firebaseMethods: FirebaseMethods) {}

  async ngOnInit(): Promise<void> {
    const toursSnapshot = await this.firebaseMethods.getDocuments(
      'tours'
    );
    const tours: { id: string; title: any; price: any; description: any; picture:any, category:any, city:any, date:any }[] = [];
    toursSnapshot.forEach((doc) => {
      const data = doc.data();
      tours.push({
        id: doc.id,
        title: data['title'],
        price: data['price'],
        description: data['description'],
        picture: data['picture'],
        category:data['category'],
        city:data['city'],
        date:data['date']
      });
    });
    this.tours = tours;
    console.log(this.tours);
    
  }
  async addToCart(id: string){
    const auth = getAuth().onAuthStateChanged(async (user) => {
    const idx = this.tours.findIndex(x => x.id == id)
    
    console.log(id, this.tours,idx, user);
    
    if (idx != -1) {
      const Tour = {...this.tours[idx], uid:user?.uid}
      await this.firebaseMethods.create('cart', Tour)
    }
    });
    
  }
}
