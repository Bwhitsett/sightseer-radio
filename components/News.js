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
import { Button, Image, StyleSheet, Text, View } from 'react-native';
class News extends React.Component {
    //Constructor for properties of News class.
    //Holds lat and lon of user if News permissions
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
                worldNews: []
        };
    }

    //Runs when the component successfully mounts.
    componentDidMount = () => {
        this.fetchNews();
    }

    //Sets location.
    // setPosition = (location) => {
    //     this.setState({
    //                 isLoaded:true,
    //                 lat: location.coords.latitude,
    //                 lon: location.coords.longitude,
    //             })
    //         }
            
    
    //Function to fetch our forecast info. Accepts a URL as a param.
    fetchNews(){
        let topStories=[];
        fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=ASAgp9Ht3AULPVmckjU0TonT7n8Ard0h')
        .then( response => response.json())
        //Legacy code used for debugging, left if needed.
        // .then(data => console.log(data.results))
        // .then(data => console.log(data.results.slice(0,5)))
        //Set the 14 forecast periods to our forecast array.
        .then(data => this.setState({worldNews: data.results.slice(0,5)}))
        //Currently throws error but still compiles so we are just
        //going to supress it by writing it to console.
        //Error may be caused by overloading by using the param name
        //link which is the same as our link state.
        .catch(error => console.log(error))
    }
   
    //Render function to create our HTML based on the JSON info.
    render = () => {
        return (
            //Exports user's current location.
            <View style={styles.container}>
                        <Text style={styles.newsHeadingText}>WORLD NEWS</Text>
                        {this.state.worldNews.map(story => (
              

           //Bootstrap CSS For each period (14) of the forecast array.
           //This increases loadtime so please be patient, I promise
           //it will load.
           //Maps the data from forecast array to a ul containing the
           //most concise and relevent information necessary for the 
           //forecast.
           <View key={story.title} style={styles.newsStory}>
                <Image style={styles.newsImage} source={story.multimedia[1].url}/>
                <Text style={styles.newsStoryText}>{story.title}</Text> 
            </View>
          ))}
                <Text style={styles.newsStoryText}>News Source: New York Times</Text>
            </View>
        )
    }
};
//Export statement.
export default News;

const styles = StyleSheet.create({
    container: {
     color: '#fff',
     marginLeft: 10,
    },
    newsHeadingText: {
        color: '#fff',
        fontSize: 50,
        alignSelf: 'center',
    },
    newsStoryText: {
        color: '#fff',
        fontSize: 30,
    },
    newsStory: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    newsImage:{
        width:100,
        height:100,
        marginRight: 10
    }
});