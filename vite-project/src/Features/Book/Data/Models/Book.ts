export class Book {
    id?: number;
    title: string;
    year: number;
  
    constructor(title: string, year: number, id?: number) {
      this.title = title;
      this.year = year;
      this.id = id;
    }
  }
  