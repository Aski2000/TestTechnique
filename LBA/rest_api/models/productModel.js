class Product{
  constructor(name, type, price, rating, warranty_years, available){
      this.name = name;
      this.type = type;
      this.price = price;
      this.rating = rating;
      this.warranty_years = warranty_years;
      this.avaible = available;        
  }
}

module.exports = { Product };
