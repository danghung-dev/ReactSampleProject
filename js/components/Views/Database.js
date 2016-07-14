module.exports = function(variable) {
  var books = [
                      {name:"Harry Potter And The Cursed Child - Parts I & II", price:65000, price_2: 57000,img:require('./../../common/image/book1.jpg')},
                      {name:"Girl Online", price:55000, price_2: 37000,img:require('./../../common/image/book2.jpg')},
                      {name:"Me Before You: A Novel (Movie Tie-In)", price:55000, price_2: 37000,img:require('./../../common/image/book3.jpg')},
                      {name:"Oxford Learner’s Pocket Dictionary 4Ed", price:65000, price_2: 47000,img:require('./../../common/image/book4.jpg')},
                      {name:"The 7 Habits Of Highly Effective People", price:300000, price_2: 284000,img:require('./../../common/image/book5.jpg')},
                      {name:"Harry Potter And The Deathly Hallows ", price:350000, price_2: 300000,img:require('./../../common/image/book6.jpg')},
                      {name:"Eat, Pray, Love", price:200000, price_2: 150000,img:require('./../../common/image/book7.jpg')},
                      {name:"The Power Of Habit", price:300000, price_2: 256000,img:require('./../../common/image/book8.jpg')},
                      {name:"Looking For Alaska", price:200000, price_2: 160000,img:require('./../../common/image/book9.jpg')},
  ];
   console.log(variable);
   return books
}
