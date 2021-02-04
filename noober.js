function renderRide(levelOfService) {
  document.querySelector('.rides').insertAdjacentHTML('beforeend', `
  <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
  <i class="fas fa-car-side"></i>
  <span>${levelOfService}</span>
  </h1>
  `)
}

function renderLeg(ride, border, color) {
  document.querySelector('.rides').insertAdjacentHTML('beforeend', `
  <div class="border-4 ${border} p-4 my-4 text-left">
    <div class="flex">
      <div class="w-1/2">
        <h2 class="text-2xl py-1">${ride.passengerDetails.first} ${ride.passengerDetails.last}</h2>
        <p class="font-bold text-gray-600">${ride.passengerDetails.phoneNumber}</p>
      </div>
      <div class="w-1/2 text-right">
        <span class="rounded-xl ${color} text-white p-2">
          ${ride.numberOfPassengers} passengers
        </span>
      </div>
    </div>
    <div class="mt-4 flex">
      <div class="w-1/2">
        <div class="text-sm font-bold text-gray-600">PICKUP</div>
        <p>${ride.pickupLocation.address}</p>
      <p>${ride.pickupLocation.city}, ${ride.pickupLocation.state} ${ride.pickupLocation.zip}</p>
    </div>
    <div class="w-1/2">
      <div class="text-sm font-bold text-gray-600">DROPOFF</div>
      <p>${ride.dropoffLocation.address}</p>
      <p>${ride.dropoffLocation.city}, ${ride.dropoffLocation.state} ${ride.dropoffLocation.zip}</p>
      </div>
    </div>
  </div>
  `)
}

async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write code to loop through the rides

    for (let i = 0; i < json.length; i++) {
      let ride = json[i]
        if (ride.length > 1) {
          levelOfService = 'Noober Pool'
          border = `border-gray-900`
          color = `bg-gray-600`
          renderRide(levelOfService)
          for (let j = 0; j < ride.length; j++) {
            let leg = ride[j]
            renderLeg(leg, border, color)
          }
        } else if (ride[0].purpleRequested) {
          levelOfService = 'Noober Purple'
          border = `border-purple-500`
          color = `bg-purple-600`
          renderRide(levelOfService)
          renderLeg(ride[0], border, color)
        } else if (ride[0].numberOfPassengers > 3) {
          levelOfService = 'Noober XL'
          border = `border-gray-900`
          color = `bg-gray-600`
          renderRide(levelOfService)
          renderLeg(ride[0], border, color)
        } else {
          levelOfService = 'Noober X'
          border = `border-gray-900`
          color = `bg-gray-600`
          renderRide(levelOfService)
          renderLeg(ride[0], border, color)
        } 
      } 
    }
  
window.addEventListener('DOMContentLoaded', pageLoaded)