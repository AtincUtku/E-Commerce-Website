const userUsername = document.getElementById('user-username');
const userAverageRating = document.getElementById('user-average-rating');
const reviewList = document.getElementById('review-list');

async function fetchUserDetails() {
  const userId = localStorage.getItem('userId');
  const response = await fetch(`/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  const userDetails = await response.json();
  displayUserDetails(userDetails);
}

function displayUserDetails(userDetails) {
  userUsername.textContent = `Username: ${userDetails.username}`;
  userAverageRating.textContent = `Average Rating: ${userDetails.averageRating.toFixed(2)}`;
}

async function fetchUserReviews() {
  const userId = localStorage.getItem('userId');
  const response = await fetch(`/users/${userId}/reviews`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
