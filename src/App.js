import {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      countryName: null,
      isValid: "All",
      isQueried: false
    }
  }

  sendApiCall = () => {
    var baseLink = 'http://localhost:8088/api/v1/phone-numbers'
    var countryName = this.state.countryName.value
    var isValid = this.state.isValid.value
    if(countryName !== "" || isValid !== "All"){
      baseLink = baseLink.concat("?")
    }
    if(countryName !== ""){
      baseLink = baseLink.concat("countryName=" + countryName)
      this.state.isQueried = true
    }
    if(this.state.isQueried){
      baseLink = baseLink.concat("&")
    }
    if(isValid !== "All"){
      if(isValid === "Valid"){
        baseLink = baseLink.concat("isValid=" + true)
      } else {
        baseLink = baseLink.concat("isValid=" + false)
      }
    }
    this.state.isQueried = false

    fetch(baseLink)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
  }

  render(){
    var {items} = this.state;
    return (
      <div className="App">
        <input name="Country" ref={(input) => this.state.countryName = input}></input>
        <select name="isValid" ref={(input) => this.state.isValid = input}>
          <option>Valid</option>
          <option>Invalid</option>
          <option>All</option>
        </select>
        <button onClick={this.sendApiCall}>Submit</button>
        <ul>
          {items.map(item => (
            <li>
              CountryCode: {item.countryCode}  |  Number: {item.number}  |  Country: {item.country}  |  Valid: {item.valid.toString()}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App