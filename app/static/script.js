document.getElementById('api-form').addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault(); // Prevent default form submission
    var userInput = document.getElementById('user-input').value;
    makeAPICall(userInput);
    document.getElementById('user-input').value = ''; // Clear the input field
    return false;
}

function makeAPICall(input) {
    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'  // Set X-Requested-With header for AJAX request
        },
        body: 'user_input=' + encodeURIComponent(input)
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();  // Parse the response as JSON
        } else {
            throw new Error('API call failed: ' + response.status);
        }
    })
    .then(function(data) {
        updateChatBox(data.data);  // Access the 'response' value in the data JSON
    })
    .catch(function(error) {
        console.error('Fetch error:', error);
    });
}

function updateChatBox(response) {
    var chatMessages = document.getElementById('chat-messages');
    var chatItem = document.createElement('li');
    chatItem.textContent = response;
    chatMessages.appendChild(chatItem);

    scrollToBottom();
}

function scrollToBottom() {
    var chatBox = document.getElementsByClassName('chat-box')[0];
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.addEventListener('DOMContentLoaded', function() {
    var hamburgerMenu = document.getElementById('hamburger-menu');
    var sideMenu = document.querySelector('.side-menu');
    var closeButton = sideMenu.querySelector('.close-button');
  
    hamburgerMenu.addEventListener('click', function() {
      sideMenu.classList.add('open');
    });
  
    closeButton.addEventListener('click', function() {
      sideMenu.classList.remove('open');
    });
  });