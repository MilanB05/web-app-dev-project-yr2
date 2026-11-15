 // my API key for accessing the city info
	const apiKey = "69e188b349ba494d84d91332260211"

  // getting html elements usinf IDs

const form = document.getElementById("WeatherF")
const message = document.getElementById("weatherMsg")
const result = document.getElementById("WResult")

// runs this function when user submits the form

form.addEventListener("submit", async function(event) {

// prevents page from refreshing when submitted
  event.preventDefault()

  //gets city name entered 
  const city = document.getElementById("city").value.trim()

  // this clears any previus weather result
  result.replaceChildren()

  // checks if user entered the city

  if(city === ""){
    message.textContent = "Please enter a valid city name"
    return
  }
  //shows the loading message 
  message.textContent = "Loading your city..."
  
  //here I ahve created API URL using the key and city name
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`


  try{
    // this sends request to WeatherAPI
    const response = await fetch(url)

    // converts JSON to JS
    const data = await response.json()

    if(!response.ok){
      throw new Error(
        data.error?.message || "we are unable to get your weather info"

      )
    }
     // gets current weather info
    const location = data.location

    // gets current weather info
    const weather = data.current

    // removes loading message
    message.textContent = ""

    // here I'm creating the heading to disaply city and country
    const heading = document.createElement("h3")
    heading.textContent = `${location.name}, ${location.country}`

    const temperature = document.createElement("p")
    temperature.textContent = 
    `Temperature: ${weather.temp_c}\u00B0C` // \u00B0C is to dispaly that circle before C in degrees celsius
    
    // create p tag to display temperature
    const condition  = document.createElement("p")
    condition.textContent = `Condition: ${weather.condition.text}`

    // creates p tag to display humidity
    const humidity = document.createElement("p")
    humidity.textContent = `Humidity: ${weather.humidity}%`

    // creates p tag to display  wind speed
    const wind = document.createElement("p")
    wind.textContent = ` Wind: ${weather.wind_kph}km/h`

    // cerates p tag to dispaly "feeels like"
    const feelsLike = document.createElement("p")
    feelsLike.textContent = `Feels like: ${weather.feelslike_c}\u00B0C`

    // adds all weather informations together

    result.append(
      heading,
      temperature,
      condition,
      humidity,
      wind,
      feelsLike
    )

  }catch(error){
    message.textContent = "Error" + error.message
  }
})
