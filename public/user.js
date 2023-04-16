const userUsername = document.getElementById('user-username');
const userAverageRating = document.getElementById('user-average-rating');
const reviewList = document.getElementById('review-list');

async function fetchUserDetails() {
  const userId = localStorage.getItem('userId');
  const response = await fetch(`/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  const userDetails = await response.json();
  displayUserDetails(userDetails);
}

function displayUserDetails(userDetails) {
  console.log(userDetails.username);
  console.log(userDetails.average_rating);
  userUsername.textContent = `Username: ${userDetails.username}`;
  userAverageRating.textContent = `Average Rating: ${userDetails.average_rating.toFixed(2)}`;
}

async function fetchUserReviews() {
  const userId = localStorage.getItem('userId');
  const response = await fetch(`/users/${userId}/reviews`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  const reviews = await response.json();
  const reviewsWithItemDetails = await Promise.all(reviews.map(async (review) => {
    const itemResponse = await fetch(`/items/${review.itemId}`);
    const itemDetails = await itemResponse.json();
    return {
      ...review,
      itemName: itemDetails.name,
      itemUrl: `/items/${itemDetails._id}`
    };
  }));
  displayUserReviews(reviewsWithItemDetails);
}

function displayUserReviews(reviews) {
  reviewList.innerHTML = '';
  reviews.forEach((review) => {
    const li = document.createElement('li');
    const itemNameLink = document.createElement('a');
    itemNameLink.href = `item.html?id=${review.itemId}`;
    itemNameLink.textContent = review.itemName;
    
    // Append the anchor element and other review details to the list item
    li.appendChild(itemNameLink);
    li.innerHTML += `: ${review.review_text} (${review.rating}/5)`;
    reviewList.appendChild(li);
  });
}
  

fetchUserDetails();
fetchUserReviews();
