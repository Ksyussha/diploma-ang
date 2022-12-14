export class Tour {
  static id(arg0: string, id: any) {
    throw new Error('Method not implemented.')
  }
  id: string
  title: string
  price:number
  description: string
  picture: string
  category: string
  city:string
  date:string
  constructor(id: string = '', title: string ='', price:number = 0, description: string ='', picture:string='', category: string='',city: string='',date:string='', ) {
    this.id = id
    this.title = title
    this.price = price
    this.description = description
    this.picture = picture
    this.category = category
    this.city = city
    this.date = date
  }
};
