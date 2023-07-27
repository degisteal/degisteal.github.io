const COMPLETED = "released",
    DEPLOYED = "deployed",
    IN_PROGRESS = "in-progress",
    NEXT = "next",
    DELAYED = "delayed",
    POLISHING = "polishing",
    FIXED = "fixed",
    COMINGSOON = "Coming Soon",
    PBT = "PBT",
    STATUS_NAMES = {
        [COMPLETED]: "Released",
        [DEPLOYED]: "Live",
        [IN_PROGRESS]: "In progress",
        [NEXT]: "Next priority",
        [DELAYED]: "Delayed",
        [POLISHING]: "Polishing",
        [COMINGSOON]: "Coming Soon",
        [PBT]: "PBT",
        [FIXED]: "Fixed"
    },

    LONG_TERM = [{
        title: "💀The Stranger",
        description: "You can become an unknown monster that has supernatural powers.",
        status: COMINGSOON,
        link: "https://www.roblox.com/games/14218299975/The-Stranger",
        features: [{
            title: "General Mechanics",
            description: "The basic mechanics of the game are being developed, from interface elements to player interactions.",
            status: IN_PROGRESS
        }]
    }],

    PRE_RELEASE = [{
        title: "🧛‍♂️Vampire Murder",
        description: "Play with friends as a Vampire, Hunter, or human. Be cautious, accidentally killing a human means death for you. Roles are randomized each match. Find weapons to fight the Vampire or aid the Vampire Hunter. Beware, the vampire lurks among the players. Minimum 3-players to start. Prepare for an adrenaline-pumping adventure!",
        status: PBT,
        link: "https://www.roblox.com/games/14132106226/Vampire-Murder-ALPHA"
    }],

    template = document.getElementById("item-template"),
    addSubmodules = function (e) {
        if (e.features) {
          const featureSection = document.getElementById("feature");
          // Clear the feature section before adding new content
          featureSection.innerHTML = "<div class='timeframefeature-label sans-font' id='feature-label'>" + e.title + "</div>";
      
          e.features.forEach((e => {
            const t = template.cloneNode(true);
            if (e.status) {
              t.firstElementChild.lastElementChild.innerHTML = STATUS_NAMES[e.status];
              t.className = `roadmap-item ${e.status}`;
              t.firstElementChild.lastElementChild.className = `item-status sans-font color-${e.status}`;
            }
      
            t.firstElementChild.firstElementChild.innerHTML = e.title;
      
            // Find the element with the class 'item-description' inside the cloned template
            const descriptionElement = t.querySelector('.item-description');
      
            // Update the description if it exists, otherwise set to an empty string
            descriptionElement.innerHTML = e.description || "";
      
            // Find the element with the class 'button-container' inside the cloned template
            const buttonContainer = t.querySelector('.button-container');
      
            // If the button container element exists, remove it from the cloned template
            if (buttonContainer) {
              buttonContainer.remove();
            }
      
            t.id = "";
      
            featureSection.appendChild(t);
          }));
      
          on();
        }
      };
document.getElementById("overlay-background").addEventListener("click", (function () {
    off()
}));

let playButtonClicked = false;

const addItemsToGroups = function (e, t) {
  t.forEach((t => {
    const i = template.cloneNode(true);
    t.status ? (t.features ? i.firstElementChild.lastElementChild.innerHTML = STATUS_NAMES[t.status] + "<br>view more" : i.firstElementChild.lastElementChild.innerHTML = STATUS_NAMES[t.status], i.className = `roadmap-item ${t.status}`, i.firstElementChild.lastElementChild.className = `item-status sans-font color-${t.status}`) : t.features && (i.firstElementChild.lastElementChild.innerHTML = "view more");
    
    // Update the event listener for the click event
    i.addEventListener("click", () => {
      // Check if the item has "features" and the "Play" button has not been clicked
      if (t.features && !playButtonClicked) {
        addSubmodules(t);
      }
    });
    
    i.firstElementChild.firstElementChild.innerHTML = t.title;
    i.querySelector('.item-description').innerHTML = t.description; // Update the description

    // Check if the item has a link and set it as the button's href attribute
    if (t.link) {
      const buttonContainer = i.querySelector('.button-container');
      if (buttonContainer) {
        const button = buttonContainer.querySelector('.cta-button');
        if (button) {
          button.href = t.link;
          // Set the button text to "Read More" based on the description
          const description = i.querySelector('.item-description').innerHTML;
          button.querySelector('.cta-label').textContent = description ? 'VIEW IN ROBLOX' : 'Play Experience';
          
          // Update the event listener for the "Play" button
          button.addEventListener("click", () => {
            // Set the flag to true when the "Play" button is clicked
            playButtonClicked = true;

            setTimeout(() => {
                playButtonClicked = false;
              }, 100);

          });
        }
      }
    }

    i.id = "";
    e.appendChild(i);
  }));
};

function on() {
    document.getElementById("overlay-background").style.display = "block"
}

function off() {
    document.getElementById("overlay-background").style.display = "none"
}
addItemsToGroups(document.getElementById("pre-release-items"), PRE_RELEASE), addItemsToGroups(document.getElementById("long-term-items"), LONG_TERM), addItemsToGroups(document.getElementById("bug-items"), BUGS);
