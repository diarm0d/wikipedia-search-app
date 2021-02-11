const searchBar = document.getElementById('searchbox');


apiURl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
proxyServer='https://obscure-sands-82167.herokuapp.com/';

results = [];

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
    console.log(results);
}

// Event listeners
searchBar.addEventListener('submit', getQuery);
