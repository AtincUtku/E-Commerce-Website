const signIn = document.getElementById('sign-in');
      const signUp = document.getElementById('sign-up');
      const logout = document.getElementById('logout');
      const username = document.getElementById('username');

      function updateAuthUI() {
        const token = localStorage.getItem('token');
        const userPage = document.getElementById('user-page');
        if (token) {
          signIn.style.display = 'none';
          signUp.style.display = 'none';
          logout.style.display = 'inline';
          username.style.display = 'inline';
          userPage.style.display = 'inline';
          username.textContent = localStorage.getItem('username');
        } else {
          signIn.style.display = 'inline';
          signUp.style.display = 'inline';
          logout.style.display = 'none';
          username.style.display = 'none';
          userPage.style.display = 'none';
        }
      }

      logout.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        updateAuthUI();
        window.location.href = 'index.html';
      });

      // Update UI on page load
      updateAuthUI();