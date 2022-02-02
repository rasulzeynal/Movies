import React from 'react';
import { Link } from 'react-router-dom';
/* 
function eventHandler(event) {
    console.log(event)
} */

const Movies = (props) => {

    const truncateOverview = (string, maxLength) => {
        if (!string) return null;
        if (string.length <= maxLength) return string;
        return `${string.substring(0,maxLength)}...`; 
    }
        return(
            <div className="row">
            {props.kinolar.map((movie,i)=>(
                <div className="col-lg-4" key={i}>
                <div className="card mb-4 shadow-sm">
                <img src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.imageURL}`} className="card-img-top" alt="test"/>
                <div className="card-body">
                <h5 className="card-tittle">{movie.name}</h5>
                <p className="card-text"> {truncateOverview(movie.overview,130)}</p>
                <div className="d-flex justify-content-between align-item-center">
                <button type="button" onClick={(event)=>props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">Delete</button>

                <Link type="button"
                      className="btn btn-md btn-outline-success"
                      to={`edit/${movie.id  }`}
                      >Edit</Link>

                <h2 ><span className="badge badge-info">{movie.rating}</span></h2>
                </div>
                </div>
                </div>
                </div>
            ))}

            
            </div>
        )
    }

export default Movies;