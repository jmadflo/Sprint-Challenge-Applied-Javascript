// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

const createCard = data => {
    const card = document.createElement('div')
    const headline = document.createElement('div')
    const author = document.createElement('div')
    const imgContainer = document.createElement('div')
    const authorImage = document.createElement('img')
    const credit = document.createElement('span')

    headline.textContent = data.headline
    authorImage.src = data.authorPhoto
    credit.textContent = `By ${data.authorName}`

    card.classList.add('card')
    headline.classList.add('headline')
    author.classList.add('author')
    imgContainer.classList.add('img-container')

    card.append(headline, author)
    author.append(imgContainer, credit)
    imgContainer.append(authorImage)

    return card
}

axios.get('https://lambda-times-backend.herokuapp.com/articles')
    .then( response => {
        console.log(response)
        const articlesInfo = Object.values(response.data.articles)
        console.log(articlesInfo)

        // articlesInfo is an array of arrays, so we need nested forEach loops to get a single article object
        articlesInfo.forEach( articleArray => {
            articleArray.forEach( article => {
                // console.log(article)
                document.querySelector('.cards-container').append(createCard(article))

            })
        })
    })
