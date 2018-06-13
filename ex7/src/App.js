import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class Jokes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {jokes: [], jokes: [], punchline: ``}
  }

  componentDidMount() {
      if(this.props.match.params.id != null){
          fetch("http://localhost:3333/jokes/" + this.props.match.params.id)
              .then(response => response.json())
              .then(data => this.setState({ punchline: data }));
      }
      fetch("http://localhost:3333/jokes")
          .then(response => response.json())
          .then(data => this.setState({ jokes: data, bjokes: data }));
  }

    filterJokes(event) {
        this.setState({ typed: event.target.value })
        let newList = this.state.bjokes.filter((joke) => joke.type == event.target.value);
        if(this.state.typed == "")
            newList = this.state.bjokes;
        this.setState({ jokes: newList });
        console.log(this.state.typed);
    }

    showPunchline = (p) =>{
      alert(p);
    }

  render() {
      let jokesLi = this.state.jokes.map((joke) => <li key={joke.id}>{joke.setup} <button onClick={() => this.showPunchline(joke.punchline)}>?</button></li>)
      return(
      <div>
          <input type="text" name="type" placeholder="type" value={this.state.typed} onChange={this.filterJokes.bind(this)} />
        <ul>
            {jokesLi}
        </ul>
      </div>
    )
  }
}

class AddJoke extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        //Could be a place to fetch data, WHY ??
    }

    addJoke = (event) => {
        event.preventDefault();
        console.log(this.state);
        fetch("http://localhost:3333/jokes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                "type": this.state.type,
                "setup": "",
                "punchline": this.state.punchline,
            })
        })
    }

    handleType(event) {
        this.setState({ type: event.target.value })
    }
    handleSetup(event) {
        this.setState({ setup: event.target.value })
    }
    handlePunchline(event) {
        this.setState({ punchline: event.target.value })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.addJoke}>
                    <input placeholder='type' type="text" value={this.state.type} onChange={this.handleType.bind(this)}/>
                    <input placeholder='setup' type="text" value={this.state.setup} onChange={this.handleSetup.bind(this)}/>
                    <input placeholder='punchline' type="text" value={this.state.placeholder} onChange={this.handlePunchline.bind(this)}/>
                    <button type="submit">Save</button>
                </form>
            </div>
        );
    }
}

const About = (props) => (
    <h1>About page</h1>
)

const App = () => (
  <Router>
    <div>
      <header>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/jokes">Jokes</NavLink>
          <NavLink to="/addJoke">Add Joke</NavLink>
          <NavLink to="/about">About</NavLink>
      </header>
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/jokes" component={Jokes}/>
        <Route path="/jokes/:id" component={Jokes}/>
        <Route path="/addJoke" component={AddJoke}/>
        <Route path="/about" component={About}/>
    </div>
  </Router>
)
export default App;
