export class Expert {
    name: string
    description: any
    picture: string
    surname: string
    speciality:string
    constructor( name: string ='', description: any = {}, picture:string='', surname: string='', speciality:string='' ) {
      this.name = name
      this.description = description
      this.picture = picture
      this.surname = surname
      this.speciality = speciality
    }
  };