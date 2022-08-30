import React, { Component } from 'react';
// import ReactModal from 'react-modal';
// import ReactDOM from 'react-dom';
import Header from '../Header/Header'
import MovieContainer from '../MovieContainer/MovieContainer';
import './App.css';
import { getAllData } from '../../api-calls';
import Modal from '../Modal/Modal';
import { Route, NavLink } from 'react-router-dom'
// import Carousel from '../Carousel/Carousel';

class App extends Component {
    constructor (){
    super();
    this.state ={
        movies: [],
        result: ``,
        showModal: []
      }
    };

    componentDidMount = () => {
      getAllData('/movies')
      .then(data => { this.setState({ movies: [...data[0].movies] }) })
      console.log(`this.state.movies`, this.state.movies)
    }
    
    selectAMovie = (event) => {
      let selectedMovie = `/movies/${event.target.id}`
      getAllData(selectedMovie).then((data) => {
        this.setState({showModal: [data[0].movie]})
        console.log(`data`, this.state.showModal)
      })       
    }

      backToHome = () => {
      this.setState({showModal: []})
      }
         
      
      
      render = () => {
  // console.log(`Modal`, Modal)
    return (
        <main className = 'App'>
          <Header />
          <Route path="/modal/:id" render={ () => <Modal props={this.state.showModal} backToHome={this.backToHome} /> } />
          <Route path="/" render={ () => <MovieContainer movies={this.state.movies} selectAMovie={this.selectAMovie} /> } />


            //  {/* { this.state.showModal.length ?(
            //     <Modal  props={this.state.showModal} backToHome={this.backToHome}/> 
            //     ) : (
            //       <>
            //        <img className="background" src='https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg' alt=''/>
            //         <MovieContainer movies={this.state.movies} selectAMovie={this.selectAMovie}/> 
                   
            //        </>
            //     )}   */}
          
        </main>
    )
  }
}

export default App;