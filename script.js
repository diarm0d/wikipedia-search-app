const searchBar = document.getElementById('searchbox');
const searchResultsContainer = document.getElementById('search-results-container');
const searchResultsWrapper = document.getElementById('search-results-wrapper');


apiURl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
proxyServer='https://obscure-sands-82167.herokuapp.com/';

let resultsVisible = false;

results = {};

async function fetchWikiAPI(query) {
    try {
        const res =  await fetch(proxyServer + apiURl + query);
        wikiRes= await res.json();
        results = wikiRes.query.pages;
        populateResults(results);
    } catch(error) {
        console.log(error);
    }
}

function getQuery(e) {
    e.preventDefault();
    query = searchBar.q.value;
    fetchWikiAPI(query);
}

function populateResults(results) {
    resultsArray = Object.values(results);
    // Create results container for each result in the array
    resultsArray.forEach(val => {
         title = val.title;
         extract =  val.extract;
         createElement(title, extract);
      });
      // Show results and jump to results section
      searchResultsContainer.style.display = "flex";
      window.location.hash = "search-results-container";
}

function createElement(title, extract) {
    // Create result container
    var resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    searchResultsWrapper.appendChild(resultContainer); 
    // Add title & extract
    var pageResult = document.createElement('span');
    pageResult.classList.add('page-title');
    pageResult.innerHTML = title;
    resultContainer.appendChild(pageResult); 

    var pageText = document.createElement('p');
    pageText.classList.add('page-text');
    pageText.innerHTML = extract;
    resultContainer.appendChild(pageText); 
}

// Event listeners
searchBar.addEventListener('submit', getQuery);
