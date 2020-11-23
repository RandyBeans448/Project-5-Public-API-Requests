//

const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');

//Creating a search bar and button.

searchContainer.innerHTML =  `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;

//

const searchInput = document.getElementById('search-input');

//Fetchs the data for the employees and pasres the data from json to javascript objects.
//It take the url as a parameter.
function fetchData(url) {
    return fetch(url)
            .then(response => { return response.json()})
            .catch(error => {console.log('Error with fetching API', error)})
          }

//Takes the results and maps the JS objects into a new array.
//adds the class 'card' for the appropriate styles.
//Sets the innerHTML and use template literals to access the properties of the JS objects
//Then appened to the gallery div.

function generateInfo(results) {
    results.map( item => {
     const card = document.createElement('div');
      card.classList.add('card');
        card.innerHTML =
    `
    <div class="card-img-container">
        <img class="card-img" src="${item.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
        <p class="card-text">${item.email}</p>
        <p class="card-text cap">${item.location.city}</p>
    </div>
    `;
    gallery.appendChild(card);

//When any of the cards are clicked the addEventListener creates and appends
// a modal div.
// Again using template literals and accessing the object properties from the JS objects
// parsed from JSON.

    card.addEventListener('click', (event) => {
      const modalDiv = document.createElement('div');
      const date = new Date(item.dob.date);
      modalDiv.innerHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${item.picture.large} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${item.name.first} ${item.name.last}</h3>
                    <p class="modal-text">${item.email}</p>
                    <p class="modal-text cap">${item.location.city}</p>
                    <hr>
                    <p class="modal-text">${item.phone}</p>
                    <p class="modal-text">
                      ${item.location.street.number} ${item.location.street.name},
                      ${item.location.city},
                      ${item.location.state},
                      ${item.location.postcode}
                    </p>
                    <p class="modal-text">Birthday: ${date.toDateString()}</p>
                    <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn"><</button>
                        <button type="button" id="modal-next" class="modal-next btn">></button>
                    </div>
                </div>
            </div>
      `;

      document.body.appendChild(modalDiv);

//addEventListener to the exit button to close the modalDiv

        const exitButton = document.getElementById("modal-close-btn");
            exitButton.addEventListener('click', (event) => {
              document.body.removeChild(modalDiv)
            });

//This is where i am having trouble

            const modals = document.querySelectorAll('.modal-container')
            const prevButton = document.getElementById('modal-prev');
            const nextButton = document.getElementById('modal-next');
            let startIndex = (modals.length * modals.length) - 1;
            let endIndex = modals.length * modals.length;

            
            prevButton.addEventListener('click', (event) => {
            for(let j = 0; j < modals.length; j ++ ){
              document.body.removeChild(modalDiv);

            }
          });

            nextButton.addEventListener('click', (event) => {
              for(let n = 0; n < modals.length; n ++) {
                document.body.removeChild(modalDiv);

              }
            });
        });
    });
  }

//fetchData called using the url as a parameter
//then data is then called on the parameter using results as the property.

fetchData('https://randomuser.me/api/?results=12')
  .then(data => generateInfo(data.results));

//Name search filter function. When a value is entered into the search bar
//only names with matching values are shown on the div

  function filter() {
    const cardsForSearch = document.querySelectorAll('.card');
        for(let i = 0; i < cardsForSearch.length; i ++) {
      let nameFromCard = cardsForSearch[i].lastElementChild.firstElementChild;
      if (nameFromCard.textContent.toUpperCase().includes(searchInput.value.toUpperCase())) {
            cardsForSearch[i].style.display = "";
          } else {
            cardsForSearch[i].style.display = "none";
          }
        }
     };



    const searchSubmit = document.querySelector('.search-submit');
    const searchBar = document.querySelector('.search-input');

//keyUp Event Listener so that the search happens in real time rather than the user having
// to click every time they want to perform a search

    searchBar.addEventListener('keyup', filter)
      function filter() {
        const cardsForSearch = document.querySelectorAll('.card');
            for(let i = 0; i < cardsForSearch.length; i ++) {
          let nameFromCard = cardsForSearch[i].lastElementChild.firstElementChild;
          if (nameFromCard.textContent.toUpperCase().includes(searchInput.value.toUpperCase())) {
                cardsForSearch[i].style.display = "";
              } else {
                cardsForSearch[i].style.display = "none";
              }
            }
         };

