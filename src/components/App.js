import React from "react";
import Movies from "./Movies";
import Search from "./Search";
import axios from "axios";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


class App extends React.Component {
  state = {
    movies: [],
    searcQuery:""
  };

  async componentDidMount(){
    this.getMovies();
  }

  async getMovies(){
    const response = await axios.get("http://localhost:3002/movies");
    this.setState({movies: response.data})
  }


      //delete movie
      deleteMovie = async (movie) => {
        axios.delete(`http://localhost:3002/movies/${movie.id}`)
        const newMovieList = this.state.movies.filter(
          m => m.id !== movie.id
        );
      

    this.setState(state => ({
      movies:newMovieList
    }))
  }
   //search movie
  searchMovie=(event) => {
    this.setState({searcQuery:event.target.value})
  }

   //add movie
  addMovie=async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie)
    this.setState(state=>({
      movies:state.movies.concat([movie])
    }))
    this.getMovies();
  }

   //EditMovie
  editMovie=async (id,updatedMovie) => {
    await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
    this.getMovies();
  }


  render() {

    let filteredMovies=this.state.movies.filter(
      (movie) => {
        return movie.name.toLowerCase().indexOf(this.state.searcQuery.toLowerCase()) !== -1
      }
    ).sort((a,b)=>{
      return a.id<b.id ? 1 : a.id>b.id ? -1 : 0;
    });


    return (
      <Router >
      <div className="container">
      <Switch>
      <Route path="/" exact render = {()=>(
        <React.Fragment>
        <div className="row">
          <div className="col-lg-12">
          <Search searchMovieProp={this.searchMovie}/>
          </div>
        </div>
        <Movies 
           kinolar={filteredMovies}
           deleteMovieProp={this.deleteMovie}/>
        </React.Fragment>
      )}>
        
           </Route>
           <Route path="/add" exact render = {(history)=>(

            <AddMovie onAddMovie={(movie)=>{this.addMovie(movie) 
              history.push('/')
            }
          }
            />

            )}>
            </Route>


            <Route path="/edit/:id"  render = {(props)=>(

              <EditMovie
              {...props}
              onEditMovie={(id,movie)=>{
                this.editMovie(id,movie) 
              }
            }
              />
  
              )}>
              </Route>
                       </Switch>
     </div>
     </Router>
    );
  }
}

export default App;
