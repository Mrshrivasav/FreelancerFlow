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
};

// Existing code for fetching contributors (if needed)
async function fetchData() {
  await fetch(
    "https://api.github.com/repos/SauravMukherjee44/CodeIN-Community-Website/contributors"
  ) //api for the get request
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
