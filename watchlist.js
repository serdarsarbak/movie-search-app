let sresult = document.getElementById('sresult')
let html = ''
let num = 1
let listArray = JSON.parse(localStorage.getItem('watchlist'))

if (listArray) {
    render()
}

document.addEventListener('click', function(e){
    let order = e.target.dataset.btn
    
    if (e.target.dataset.btn>0) {
        listArray.splice(order-1, 1)
        localStorage.removeItem('watchlist')
        localStorage.setItem ('watchlist', JSON.stringify(listArray))
        render()
    } 
    
    if (listArray==false) {
        sresult.innerHTML = `      
        <div class="watchlistnodata">
                    <p>Your watchlist is looking a little empty...</p>
                </div>
                <div class="addclass">
                    <a class='addsmth' href="/index.html"><img class='plusicon' src="/images/plusicon.png"><p>Lets add some movies</p></a>
                </div>
        </div>   
        `
    }
})

async function render () {
    sresult.classList.remove('nodata')
    sresult.classList.add('movielist')
    num = 1
    html=''
    
    for (film of listArray) {
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
                    <button data-btn=${num} class='watchlistbtn'><img src='/images/minusicon.png'> Remove</button>
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