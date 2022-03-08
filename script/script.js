const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)') /* grabs all seats in a row that are not occupied */
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = parseInt(movieSelect.value)

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  const selectedSeatsCount = selectedSeats.length
 
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)) /* Spread operator passes in values (not array itself) */

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)) /* JSON.stringify converts array to string that can be saved to local storage */

  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

// Get data from localstorage and populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) /* JSON.parse converts string into array */
  if(selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  if(selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = parseInt(e.target.value)
  updateSelectedCount()

  setMovieData(e.target.selectedIndex, e.target.value)
})

// Seat click event
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected') /* toggle adds/removes .selected class on click */

    updateSelectedCount()
  }
})

// Populate UI from localstorage
populateUI()

// Initial count and total on page load
updateSelectedCount()

