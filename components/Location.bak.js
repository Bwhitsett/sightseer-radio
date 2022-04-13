//Author: Brian Whitsett
//Date: 3/30/2022
//SightSeer App

//*STYLE GUIDE NOTICE*
//I have kept the lines under 72 wherever possible,
//but in several places trying to keep it under 72
//has broken my code, so I may have gone a few chars
//over in some places.

//*ADBLOCK WARNING*
//This may have been an isolated incident but my ad
//blocking extension prevented my react app from 
//loading once, if you have any issues try disabling
//any adblocking extensions.

//*END NOTICES*

//Import statements.
import React from 'react';
import { Button, Text } from 'react-native';
class Location extends React.Component {
    //Constructor for properties of Location class.
    //Holds lat and lon of user if location permissions
    //are granted, error messages, load state, link to 
    //forecast information, and an array for storing
    //the 14 periods of the weather forecast.
    constructor(props) {
            super(props);
            this.state = {
                lat:null,
                lon:null,
                error:null,
                isLoaded:false,
                link: null,
                forecast: []
        };
    }

    //Runs when the component successfully mounts.
    componentDidMount = () => {

        //Get user location.
        navigator.geolocation.getCurrentPosition(this.setPosition);
    }

    //Sets location.
    setPosition = (location) => {
        //Fetches initial link using user's coordinates.
        fetch(`https://api.weather.gov/points/${location.coords.latitude},${location.coords.longitude}`)
        .then( response => response.json())
        //Legacy code during debugging, left if needed.
        // .then(data => console.log(data))
        //Assign returned data to our properties.
        //Assigns lat, lon, and the link we will
        //use to fetch our forecast.
        .then(data => this.setState({
            isLoaded:true,
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            link: data.properties.forecast
        }))

        //Handles any errors.
        .catch(error => alert(error))   
    }
    
    //Function to fetch our forecast info. Accepts a URL as a param.
    fetchForcast(link){
        fetch(link)
        .then( response => response.json())
        //Legacy code used for debugging, left if needed.
        // .then(data => console.log(data))
        //Set the 14 forecast periods to our forecast array.
        .then(data => this.setState({forecast: data.properties.periods}))

        //Currently throws error but still compiles so we are just
        //going to supress it by writing it to console.
        //Error may be caused by overloading by using the param name
        //link which is the same as our link state.
        .catch(error => console.log(error))
    }

    dump(){
        console.log(this.state.forecast[0]);
    }
   
    //Render function to create our HTML based on the JSON info.
    render = () => {
        //Call fetchForcast function to get forecast info.
        this.fetchForcast(this.state.link);
        return (
            //Exports user's current location.
            <div className="location">
                <h4>Your latitude is: { this.state.lat }</h4>
                <h4>Your longitude is: { this.state.lon }</h4>
                <div class="container">
                <div class="row">
                    <div class="weather">
                        <Text>Forecast</Text>
                        <Button onPress={() => dump()}>Test</Button>
                    </div>
          {/* {this.state.forecast.map(period => (
              

           //Bootstrap CSS For each period (14) of the forecast array.
           //This increases loadtime so please be patient, I promise
           //it will load.
           //Maps the data from forecast array to a ul containing the
           //most concise and relevent information necessary for the 
           //forecast.
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                <img class="bd-placeholder-img card-img-top" width="100%"
                height="225" src={period.icon} alt="Weather Image"></img>
                <div class="card-body">
                    <ul key={period.name} class="card-text">
                        <li>{period.name}</li>
                        <li>{period.shortForecast}</li>
                        <li>{period.temperature} &deg;F</li>
                        <li>Wind {period.windSpeed} {period.windDirection}</li>
                    </ul>
                <div class="d-flex justify-content-between align-items-center">
                    </div>
                    </div>
                </div>
            </div>
          ))} */}

        </div>
        </div>
                
                <p>Forecast Source: {this.state.link}</p>
            </div>
        )
    }
};
//Export statement.
export default Location;