export class Search {
  constructor(
    public name: string,
    public category: string,
    public location: string,
    public priceMin?: number,
    public priceMax?: number,
    public delivery?: boolean,
    public available?: boolean,
    public isRentable?: boolean,
    public isService?: boolean,
  ){}
}
