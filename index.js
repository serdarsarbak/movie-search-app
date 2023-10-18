let searcBtn = document.getElementById('searchBtn')
let mag = document.getElementById('mag')
let sresult = document.getElementById('sresult')
let movieIdArray = []
let watchlistMovies =[]
let html = ''
let num = 1

searcBtn.addEventListener ('click', function() {
    num=1
    let search = mag.value
    searchMovie (search)
})




document.addEventListener('click', function(e){
    let order = e.target.dataset.btn
    if (e.target.dataset.btn>0) {
        if (localStorage.getItem('watchlist')){
            let watchlistMovies = JSON.parse(localStorage.getItem('watchlist'))
            
            if(!watchlistMovies.includes(movieIdArray[order-1])){
            watchlistMovies.push(movieIdArray[order-1])
            localStorage.setItem ('watchlist', JSON.stringify(watchlistMovies))
            
            
            
            const clickedbtn = document.querySelector('.watchlistbtn')
            e.target.disabled=true
            
            
            
            } else {
                localStorage.setItem ('watchlist', JSON.stringify(watchlistMovies))
                setTimeout("alert('The movie is already in your watchlist');", 3);
                 e.target.disabled=true
            }
        } else {
            
            if(!watchlistMovies.includes(movieIdArray[order-1])){
                
                watchlistMovies.push(movieIdArray[order-1])
                localStorage.setItem ('watchlist', JSON.stringify(watchlistMovies))
               
                e.target.disabled=true
        
             } else {
                  localStorage.setItem ('watchlist', JSON.stringify(watchlistMovies))
                  setTimeout("alert('The movie is already in your watchlist');", 3);
                   e.target.disabled=true
             }
        }
    }
})


function searchMovie (movie) {
    fetch (`https://www.omdbapi.com/?apikey=d248c7da&s=${movie}`)
        .then (res => res.json())
        .then (data => {
            movieIdArray =[]
            if(data.Search) {
                let result = data.Search
                for (let item of result){
                    movieIdArray.push(item.imdbID)
                }      
                html =''
                render()
            } else {
            sresult.innerHTML = `      
            <div class="emptysearch">
                <p>Unable to find what you’re looking for. <br> Please try another search.</p>
            </div> 
            `
        }     
})}

async function render () {
    sresult.classList.remove('nodata')
    sresult.classList.add('movielist')
    for (film of movieIdArray) {
        let response = await fetch (`https://www.omdbapi.com/?apikey=d248c7da&i=${film}`)
        let data = await response.json()
        html += `
        <div class='movie'>
            <div class='firstgrid'>
                <img class='movieposter' src='${data.Poster}'> 
            </div>
            <div class='secondgrid'>
                <div class='itemname'>
                    <h4>${data.Title}</h4>
                    <img class='itemstar' src='/images/staricon.png'>
                    <p class='itemnamerating'>${data.imdbRating}</p>
                </div>
                <div class='iteminfo'>
                    <p class='runtime'>${data.Runtime}</p>
                    <p class='genre'>${data.Genre}</p> 
                    <button data-btn=${num} class='watchlistbtn'><img src='/images/plusicon.png'> Watchlist</button>
                </div>    
                <div>
                <p class='itemplot'>${data.Plot}</p>
                </div>
            </div>
        </div>
        `
        num++
        sresult.innerHTML = html
}}
   
   
