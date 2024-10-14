import "./Banner.css"
import{useState,useEffect} from 'react'
import {API_KEY,imageUrl} from '../../Constants/constants'

import axios from "../../Constants/axios"

function Banner() {

  const [movie,setMovie]=useState(null)

  const[trailerurl,setTrailerUrl]=useState("")

  useEffect(()=>{
    //fetch trending movies

    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((res)=>{

      const movies=res.data.results;

      const randomMovie=movies[Math.floor(Math.random() * movies.length)]
      setMovie(randomMovie)

       // Fetch the movie's trailer
       axios.get(`/movie/${randomMovie.id}/videos?api_key=${API_KEY}&language=en-US`).then((res)=>{

        if (res.data.results.length !== 0) {
          const trailerKey = res.data.results[0].key;
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailerKey}`);
        }else{

          console.log("NO trailer")
        }

       })
    })
  },[])


  const handlePlaybutton=()=>{

    if(trailerurl){
      window.open(trailerurl,"_blank")
    }else{
      alert("Trailer Not available")
    }
  }
  
  return (
    <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }} className="Banner">
        <div className="content">
            <h1 className="title">{movie ? (movie.title || movie.name) : ''}</h1>
            <div className="banner_buttons">
                <button onClick={handlePlaybutton} className="button">Play</button>
                <button className="button">My List</button>

            </div>
            <h1 className="description">{movie ? movie.overview : ''}</h1>
        </div>

        <div className="fade_bottom"></div>


      
    </div>
  )
}

export default Banner
