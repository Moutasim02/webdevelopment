// Method 1
const book = {
    title: "1984",
    author: "George",
    isAvailable: false,

    checkIn: function () {
        this.isAvailable = true;
    },

    checkOut: function () {
        this.isAvailable = false;
    },

};
book.checkIn();
console.log(book.isAvailable)
console.log(typeof book)


// Method 2
const book2 = new Object();
book2.title = "1984"
book2.author = 'Henry'

book2.checkIn= function () {
    this.isAvailable = true
};

book2.checkOut= function () {
    this.isAvailable = false
};

console.log(typeof book2)