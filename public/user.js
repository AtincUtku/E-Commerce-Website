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
  displayUserReviews(reviews);
}

function displayUserReviews(reviews) {
    reviewList.innerHTML = '';
    reviews.forEach((review) => {
      const li = document.createElement('li');
      li.textContent = `${review.itemName}: ${review.review} (${review.rating}/5)`;
      reviewList.appendChild(li);
    });
  }
  

fetchUserDetails();
fetchUserReviews();
