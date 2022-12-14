import { Component, OnInit } from '@angular/core';
import FirebaseMethods from 'src/utils/firebaseMethods';
import { Expert } from '../models/expert.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  experts: Expert[] = [new Expert()];
  constructor(private firebaseMethods: FirebaseMethods) {}

  async ngOnInit(): Promise<void> {
    const expertsSnapshot = await this.firebaseMethods.getDocuments(
      'experts'
    );
    const experts: { name: string, description: any, picture:string, surname: string, speciality:string }[] = [];
    expertsSnapshot.forEach((doc) => {
      const data = doc.data();
      experts.push({
        name: data['name'],
        description: data['description'],
        picture: data['picture'],
        surname:data['surname'],
        speciality:data['speciality']
      });
    });
    this.experts = experts;
    // console.log(this.tours);
    
  }
}
