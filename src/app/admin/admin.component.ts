import { Component, OnInit } from '@angular/core';
import { db } from 'src/utils/firebase';
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { deleteDoc, addDoc } from "firebase/firestore";
import FirebaseMethods from 'src/utils/firebaseMethods';
import { getAuth } from 'firebase/auth';
import { Tour } from '../models/tour.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title:string ='';
  price:number = 0;
  description:string = '';
  category:string = '';
  city:string ='';
  date:string ='';
  picture:string ='';

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

  async deleteDoc(id:string){
    const idx = this.tours.findIndex(x => x.id == id)
    // const productsSnapshot = await this.firebaseMethods.removeDocument('cart', this.tours.id)
    await deleteDoc(doc(db,'tours', this.tours[idx].id));
    console.log(this.tours[idx]);
    
  } 

    async createDoc(){
      const docRef = await addDoc(collection(db, "tours"), {
        title: this.title,
        price: this.price,
        description: this.description,
        picture: this.picture,
        category: this.category,
        city: this.city,
        date: this.date,
      });
      console.log("Document written with ID: ", docRef.id);
    }

}

