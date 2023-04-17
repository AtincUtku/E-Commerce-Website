class User {
  constructor(username, password, isAdmin, average_rating, reviews) {
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin || false;
    this.average_rating = average_rating || 0;
    this.reviews = reviews || [];
  }
}

module.exports = User;
