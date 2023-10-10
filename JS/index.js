// Storing Element we Needed

const country = document.querySelector(".country");
const searchBtn = document.querySelector(".search-btn");
const inputCountry = document.querySelector(".enter-country");

// Adding Event for The Seach Button

searchBtn.addEventListener("click", getCountryName);

// This function get a value from the input and send to the getCountryData function

function getCountryName() {
  const country = inputCountry.value.trim();
  inputCountry.value = "";
  getCountryData(country);
}

// This function get a country data from an API and Send to the renderCountry(if.data.fllfilled) or renderError(if.data.rejected)

async function getCountryData(country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    if (response.ok === false)
      throw new Error(
        `No Match for the value you entered status:${response.status}`
      );
    const data = await response.json();
    const [presentData] = data.filter((data) => {
      if (data.independent) return data;
    });
    renderCountry(presentData);
  } catch (err) {
    renderError(`Error : ${err.message}`);
  }
}

// This render the data and Show to the user

function renderCountry(data) {
  const currencyArray = Object.values(data.currencies);

  const html = `
  <div class="country-container">
  
    <div class="country-flag">
      <img src="${data.flags.png}" alt="flag" class="flag" />
    </div>

    <div class="country-detail">
        <h2 class="country-name">${data.name.common}</h2>
        <p class="country-region">${data.region}</p>
        <p class="country-population"><span>Population :</span>${(
          +data.population / 1000000
        ).toFixed(1)} M </p>
        <p class="country-capital"><span>capital :</span>${data.capital[0]}</p>
        <p class="country-currency"><span>Currency :</span>${
          currencyArray[0].name
        }</p>
    </div>

  </div>`;

  country.innerHTML = "";
  country.insertAdjacentHTML("afterbegin", html);
}

// This render error and show to the user

function renderError(error) {
  country.textContent = error;
}
