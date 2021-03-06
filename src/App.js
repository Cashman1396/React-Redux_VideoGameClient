import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
import { Route, Switch, withRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Welcome from './components/Welcome'
import VideoGames from './components/VideoGames'
import NewGameFormWrap from './components/NewGameFormWrap'
import EditGameFormWrap from './components/EditGameFormWrap'
import VideoGameCard from './components/VideoGameCard'
import './index.css'



class App extends Component {
  componentDidMount(){
    this.props.boundGetCurrentUser()
  }

  render() {
    const { loggedIn, videoGames } = this.props
    return (
        <div className="App">
          { loggedIn ? <NavBar /> : <Home />}
          <Switch>
              <Route exact path='/Welcome' component={Welcome}/>
              <Route exact path='/signup' component={Signup}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/videoGames' component={VideoGames}/>
              <Route exact path='/videoGames/new' component={NewGameFormWrap}/>
              
              {/* throws an error with videoGames.find */}
              <Route exact path='/videoGames/:id' render={props => {
                const videoGame = Array.from(videoGames).find(videoGame => 
                (videoGame.id === props.match.params.id))
                return <VideoGameCard videoGame={videoGame} {...props}/>
              }
            }/>

              <Route exact path='/videoGames/:id/edit' render={props => {
                const videoGame = Array.from(videoGames).find(videoGame => {
                return videoGame.id === props.match.params.id
              })
              
              return <EditGameFormWrap videoGame={videoGame} {...props}/>
              }
            }/>
            </Switch>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    loggedIn: !!state.currentUser,
    videoGames: state.videoGames
  })
}

const mapDispatchToProps = dispatch => {
  return {
    boundGetCurrentUser: () => dispatch(getCurrentUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))