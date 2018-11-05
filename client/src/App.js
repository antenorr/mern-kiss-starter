import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = { 
    products: [],
    nasaData: null
   }

  // Fetch products AKA intitial connection after first mount
  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    // Get the passwords and store them in state
    fetch('/products')
      .then(res => res.json())
      .then(products => { 
        this.setState({ products });
        console.log(products)
    });
  }

  nasaData = () => {

    fetch(`/api/spacex`, { method: 'GET' })
      .then((response) => {
        return response.json();
      })
      .then((nasaData) => {
        this.setState({ nasaData })
        console.log(nasaData)
        // console.log(JSON.stringify(nasaData));
      });

  }

  render() {
    const { products, nasaData } = this.state;
    let shipNames = null;
    if (nasaData) {
      shipNames = nasaData.map((el, idx) => {
       return  <p key={idx}>{el.mission_name}</p>
      })
    }

    return (
      <div>

        <button
          className="more button"
          onClick={this.nasaData}>
          Get More
        </button> 
        <div>
          {products.message}
        </div>
        <div>
          {shipNames}
        </div>





      </div>
    );
  }
}

export default App;
