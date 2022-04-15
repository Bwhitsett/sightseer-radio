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
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMoon, faCloud, faCloudMoon, faCloudMoonRain, faSun, faCloudSun,
        faCloudSunRain, faCloudBolt, faCloudShowersHeavy, faCloudRain,
        faSnowflake,
        } from '@fortawesome/free-solid-svg-icons'
        //assigns a friendly name to each weather icon.
        const icons = {
            "sun": <FontAwesomeIcon icon={ faSun } color={ 'white' } size={200}/>,
            "moon": <FontAwesomeIcon icon={ faMoon } color={ 'white' } size={200}/>,
            "cloud": <FontAwesomeIcon icon={ faCloud } color={ 'white' } size={200}/>,
            "cloudMoon": <FontAwesomeIcon icon={ faCloudMoon } color={ 'white' } size={200}/>,
            "cloudMoonRain": <FontAwesomeIcon icon={ faCloudMoonRain } color={ 'white' } size={200}/>,
            "cloudSun": <FontAwesomeIcon icon={ faCloudSun } color={ 'white' } size={200}/>,
            "cloudSunRain": <FontAwesomeIcon icon={ faCloudSunRain } color={ 'white' } size={200}/>,
            "cloudBolt": <FontAwesomeIcon icon={ faCloudBolt } color={ 'white' } size={200}/>,
            "rainHeavy": <FontAwesomeIcon icon={ faCloudShowersHeavy } color={ 'white' } size={200}/>,
            "rainLight": <FontAwesomeIcon icon={ faCloudRain } color={ 'white' } size={200}/>,
            "snow": <FontAwesomeIcon icon={ faSnowflake } color={ 'white' } size={200}/>,

        }
class Weather extends React.Component {
    //Constructor for properties of Weather class.
    //Holds lat and lon of user if Weather permissions
    //are granted, error messages, load state, link to 
    //forecast information, and an object for storing the forecast.
   
    constructor(props) {
            super(props);
            this.state = {
                lat:null,
                lon:null,
                error:null,
                isLoaded:false,
                link: null,
                forecast: {},
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
        // .then(data => console.log(data.properties.periods[0].name))
        //Set the 14 forecast periods to our forecast array.
        .then(data => this.setState({forecast: data.properties.periods[0]}))

        //Currently throws error but still compiles so we are just
        //going to supress it by writing it to console.
        //Error may be caused by overloading by using the param name
        //link which is the same as our link state.
        .catch(error => console.log(error))
    }
   //programatically sets the weather icon according to the forecast, defaults to cloudSun
   //if no match is found.
    setIcons = () => {
        let weatherIcons;
        if (this.state.forecast.shortForecast === "Sunny") {
            weatherIcons = icons.sun;
        }
        else if (this.state.forecast.shortForecast === "Mostly Sunny") {
            weatherIcons = icons.cloudSun;
        }
        else if (this.state.forecast.shortForecast === "Showers And Thunderstorms Likely" ||
        this.state.forecast.shortForecast  === "Showers And Thunderstorms" ||
        this.state.forecast.shortForecast  === "Chance Showers And Thunderstorms then Showers And Thunderstorms") {
            weatherIcons = icons.cloudBolt;
        }
       else if (this.state.forecast.shortForecast === "Chance Rain Showers then Mostly Sunny" ||
        this.state.forecast.shortForecast === "Partly Sunny then Slight Chance Rain Showers" ||
        this.state.forecast.shortForecast === "Slight Chance Rain And Snow Showers then Partly Sunny" ||
        this.state.forecast.shortForecast === "Chance Rain Showers then Chance Rain And Snow Showers"  ||
        this.state.forecast.shortForecast === "Chance Rain Showers" || 
        this.state.forecast.shortForecast === "Chance Rain And Snow Showers" ||
        this.state.forecast.shortForecast  === "Showers And Thunderstorms"){
        weatherIcons = icons.cloudSunRain;
    }
    else if (this.state.forecast.shortForecast === "Partly Cloudy" ||
            this.state.forecast.shortForecast  === "Cloudy") {
        weatherIcons = icons.cloud;
    }
    else if (this.state.forecast.shortForecast === "Slight Chance Rain Showers") {
        weatherIcons = icons.rainLight;
    }
    else if (this.state.forecast.shortForecast === "Rain Showers") {
        weatherIcons = icons.rainHeavy;
    }
    //Night Icons
    else if ((this.state.forecast.name === "Tonight" ||
    this.state.forecast.name === "Overnight") &&
    this.state.forecast.shortForecast  === "Clear") {
        weatherIcons = icons.moon;
   }
   else if ((this.state.forecast.name === "Tonight" ||
        this.state.forecast.name === "Overnight") &&
        (this.state.forecast.shortForecast  === "Chance Showers And Thunderstorms" ||
        this.state.forecast.shortForecast === "Chance Rain Showers then Chance Rain And Snow Showers"  ||
        this.state.forecast.shortForecast === "Chance Rain Showers" || 
        this.state.forecast.shortForecast === "Chance Rain And Snow Showers" ||
        this.state.forecast.shortForecast === "Slight Chance Rain Showers" ||
        this.state.forecast.shortForecast === "Rain Showers" ||
        this.state.forecast.shortForecast  === "Chance Showers And Thunderstorms then Showers And Thunderstorms" ||
        this.state.forecast.shortForecast  === "Showers And Thunderstorms")) {
    weatherIcons = icons.cloudMoonRain;
    }
    else if (this.state.forecast.name === "Tonight" ||
   this.state.forecast.name === "Overnight" &&
   this.state.forecast.shortForecast  === "Partly Cloudy" ||
   this.state.forecast.shortForecast  === "Cloudy") {
    weatherIcons = icons.cloudMoon;
    }

    //Either Night or Day
    else if (this.state.forecast.shortForecast === "Slight Chance Snow Showers" ||
            this.state.forecast.shortForecast === "Chance Snow Showers") {
        weatherIcons = icons.snow;
    }
    else {
        weatherIcons = icons.cloudSun;
    }
        return weatherIcons;
    }

    
    //Render function to create our HTML based on the JSON info.
    render = () => {
        //Call fetchForcast function to get forecast info.
        this.fetchForcast(this.state.link);
        // this.setIcons();
        return (
            //Exports user's current location.
            <View style={styles.weatherContainer}>
                <View style={styles.weatherIconContainer}>
                    {this.setIcons()}
                    <Text style={{color: '#fff', fontSize: 100, marginLeft: 10}}>{this.state.forecast.temperature}°{this.state.forecast.temperatureUnit}{"\n"}</Text>
                </View>
                <View style={styles.weatherTextContainer}>
                    <Text style={styles.weatherText}>{this.state.forecast.name}{"\n"}</Text>
                    <Text style={styles.weatherText}>{this.state.forecast.shortForecast}{"\n"}</Text>
                    <Text style={styles.weatherText}> Wind {this.state.forecast.windSpeed} & {this.state.forecast.windDirection}</Text>  
                    <Text style={styles.weatherText}>Forecast Source: National Weather Service</Text>
                </View>
            </View>
        )
    }
};
//Export statement.
export default Weather;

const styles = StyleSheet.create({
    weatherText: {
     color: '#fff',
     fontSize: 30
    },
    weatherContainer: {
    },
    weatherTextContainer: {

    },
    weatherIconContainer: {
        flexDirection: 'row',
    }
});