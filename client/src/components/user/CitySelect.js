import React from 'react';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

class CitySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  //Going to need additional code to enter this
  render() {
    return (      
      <div className='city'>
        <Subheader>{this.props.header}</Subheader>
        <select id = 'city'>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="Houston">Houston </option>
          <option value="Phoenix">Phoenix </option>
          <option value="Philadelphia">Philadelphia</option>
          <option value="San Antonio">San Antonio</option>
          <option value="Dallas">Dallas</option>
          <option value="San Jose">San Jose</option>
          <option value="Austin">Austin</option>
          <option value="Jacksonville">Jacksonville</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Columbus">Columbus</option>
          <option value="Indianapolis">Indianapolis</option>
          <option value="Fort Worth">Fort Worth</option>
          <option value="Charlotte">Charlotte</option>
          <option value="Seattle">Seattle</option>
          <option value="Denver">Denver</option>
          <option value="El Paso">El Paso</option>
          <option value="Washington">Washington</option>
          <option value="Boston">Boston</option>
          <option value="Detroit">Detroit</option>
          <option value="Nashville">Nashville</option>
          <option value="Memphis">Memphis</option>
          <option value="Portland">Portland</option>
          <option value="Oklahoma City">Oklahoma City</option>
          <option value="Las Vegas">Las Vegas</option>
          <option value="Louisville">Louisville</option>
          <option value="Baltimore">Baltimore</option>
          <option value="Milwaukee">Audi</option>
          <option value="Albuquerque">Albuquerque</option>
          <option value="Tucson">Tucson</option>
          <option value="Fresno">Fresno</option>
          <option value="Sacramento">Sacramento</option>
          <option value="Mesa">Mesa</option>
          <option value="Kansas City">Kansas City</option>
          <option value="Atlanta">Atlanta</option>
          <option value="Long Beach">Long Beach</option>
          <option value="Colorado Springs">Colorado Springs</option>
          <option value="Raleigh">Raleigh</option>
          <option value="Miami">Miami</option>
          <option value="Virginia Beach">Virginia Beach</option>
          <option value="Omaha">Omaha</option>
          <option value="Oakland">Oakland</option>
          <option value="Minneapolis">Minneapolis</option>
          <option value="Tulsa">Tulsa</option>
          <option value="Arlington">Arlington</option>
          <option value="New Orleans">New Orleans</option>
          <option value="Wichita">Wichita</option>
        </select> 
        <br/> <br/>
        <button type="button" onClick = {() => this.props.updateCity(document.getElementById('city').value)} > Submit </button>
      </div>
    );     
  }
}

export default CitySelect;
