import "./RowPost.css";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { API_KEY } from "../../constants";
import { imageUrl } from "../../constants";
import Youtube from 'react-youtube';

const RowPost = (props) => {
    const [movies, setMovies] = useState([]);
    const [urlId, setUrlId] = useState("");

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        setMovies(response.data.results);
        console.log(movies);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
    
    
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
    };
    

    const handleMovieTrailer = (id) => {
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if(response.data.results.length!==0){
               setUrlId(response.data.results[0])
               console.log(response.data.results[0]);
            }else{
               console.log('Array empty');
            }
      
          })
    }

  return (
    <div className="row">
          <h2>{ props.title}</h2>
      <div className="posters">
        {movies.map((movie) => (
          <img
                onClick={() => {
                    handleMovieTrailer(movie.id)
                    console.log(movie.id)
                }} className={props.isSmall ? 'smallPoster' : 'poster'}
            alt="poster"
            src={`${imageUrl+ movie.backdrop_path}`}
          />
        ))}
          </div>
         {urlId && <Youtube videoId={urlId.key} opts={opts}/>}
    </div>
  );
};

export default RowPost;
