import {useState,useEffect} from "react"
import YouTube from "react-youtube"
import "./rowpost.css"
import PropTypes from "prop-types"; // Import prop-types
import { API_KEY,imageUrl } from "../../Constants/constants"
import axios from "../../Constants/axios"


function Rowpost(props) {

    const [movie,setMovie]=useState([])
    const[trailerId,setTrailerId]=useState("") // track the video id for the  trailer 

    // fetch url when the component mounts
    useEffect(() => {
        axios.get(props.url)
          .then((response) => {
            setMovie(response.data.results); // Update the movies state
          })
          .catch((error) => {
            console.error("Error fetching movies:", error); // Handle errors
          });
    }, [props.url]); // Only fetch data when 'props.url' changes
    

    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        autoplay: 1,
        loop: 0, // Set loop to 1 to enable looping
        controls: 1,
        modestbranding: 1,
        rel: 0,
        fs: 1,
        showinfo: 1,
        enablejsapi: 1,
        suggestedQuality: 'hd1080'
      },
    };
const handleMovieClick=(movieId)=>{

    axios.get(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
    .then((response)=>{
       if(response.data.results.length!=0){
        const videoId=response.data.results[0].key // get youtube videoId
        if(trailerId===videoId){
            setTrailerId("")
        }else{
            setTrailerId(videoId)
        }
       }else{
        console.log("No trailer available")
       }
    })



}

  return (
   <div className='row'>
     <h2>{props.title}</h2>
     <div className='posters'>
        {movie.map((movie)=>(
            <div key={movie.id} className='movie-container'>
            <img
              onClick={() => handleMovieClick(movie.id)}
              className={props.isSmall ? 'smallPoster' : 'poster'}
              src={`${imageUrl + movie.backdrop_path}`}
              alt={movie.title || movie.name || movie.original_title}
            />
            <div className="movie-title">
              {movie.title || movie.name || movie.original_title}
            </div>
          </div>
        ))}

</div>
       <div>
       {trailerId && (
            <YouTube
            videoId={trailerId} // Render the trailer for the current video ID
            opts={opts}
          />
        )}
       </div>
        


       
 </div>



  )
}

// Define prop types for the component
Rowpost.propTypes = {
    url: PropTypes.string.isRequired, // url is required and should be a string
    title: PropTypes.string.isRequired, // title is required and should be a string
    isSmall: PropTypes.bool, // isSmall is optional and should be a boolean
  };
  

export default Rowpost
