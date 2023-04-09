class User {
    constructor(username, email, reviews = []) {
      this.username = username;
      this.email = email;
      this.reviews = reviews;
    }
  
    addReview(itemId, rating, comment) {
      const review = { itemId, rating, comment };
      this.reviews.push(review);
    }
  
    getReviewIndex(itemId) {
      return this.reviews.findIndex((review) => review.itemId === itemId);
    }
  
    updateReview(itemId, rating, comment) {
      const reviewIndex = this.getReviewIndex(itemId);
      if (reviewIndex === -1) {
        return false;
      }
      this.reviews[reviewIndex].rating = rating;
      this.reviews[reviewIndex].comment = comment;
      return true;
    }
  }
  
  module.exports = User;
  