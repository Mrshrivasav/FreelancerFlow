// Fetch profiles from the server
async function fetchProfiles() {
  await fetch('/get-profiles') // API route to get profiles from the database
    .then((response) => response.json())
    .then((data) => {
      const profilesContainer = document.getElementById('profiles');

      if (!data.length) {
        profilesContainer.innerHTML = '<p>No profiles to display</p>';
        return;
      }

      let profiles = [];
      data.forEach((profile) => {
        let profileCard = `
          <div class="profile-card">
            <img src="${profile.profilePicURL}" alt="${profile.name}">
            <h3>${profile.name}</h3>
            <p>Role: ${profile.role}</p>
            ${
              profile.role === 'freelancer'
                ? `<p>Skills: ${profile.skills || 'Not provided'}</p>`
                : `<p>Requirements: ${profile.requirements || 'Not provided'}</p>`
            }
            <a href="mailto:${profile.contact}">Contact</a>
          </div>`;
        profiles.push(profileCard);
      });

      profilesContainer.innerHTML = profiles.join('');
    })
    .catch((error) => {
      console.error('Error fetching profiles:', error);
    });
}

// Fetch profiles on page load
window.onload = function () {
  fetchProfiles();
  fetchData();
};

// Existing code for fetching contributors (if needed)
async function fetchData() {
  await fetch(
    "https://api.github.com/repos/SauravMukherjee44/CodeIN-Community-Website/contributors"
  ) // API for the get request
    .then((response) => response.json())
    .then((data) => {
      let contributors = data ?? "No contributors";
      let contributorsName = [];
      let contributorImageURL = [];
      let contributorGitHubURL = [];
      let contributor = [];

      for (let i = 0; i < contributors.length; i++) {
        contributorImageURL[i] = contributors[i].avatar_url;
        contributorGitHubURL[i] = contributors[i].html_url;
        contributorsName[i] = contributors[i].login;
        contributor[i] = `<a href="${contributorGitHubURL[i]}" target="_blank">
            <img src="${contributorImageURL[i]}" alt="${contributorsName[i]}">
            <span>${contributorsName[i]}</span>
            </a>`;
      }

      let contributorBox = document.querySelector("#contributor");
      contributorBox.innerHTML = contributor.join("");
    })
    .catch((e) => {
      console.error(e);
    });
}

// Existing footer year logic
const d = new Date();
let year = d.getFullYear();
document.querySelector(".year").innerHTML = year;

// Typing effect for the paragraph
document.addEventListener("DOMContentLoaded", function() {
    const typingElement = document.getElementById("typing-effect");

    if (typingElement) { // Check if the element exists
        const text = typingElement.getAttribute("data-text"); // Use data attribute for text
        typingElement.textContent = ""; // Clear the original text

        const words = text.split(' '); // Split the text into words
        let index = 0;

        function type() {
            if (index < words.length) {
                typingElement.textContent += words[index] + ' '; // Add the word with a space
                index++;
                setTimeout(type, 100); // Adjusted to 100ms per word for 5-second completion
            }
        }

        type(); // Start typing
    } else {
        console.error('Element with id "typing-effect" not found.');
    }
});
