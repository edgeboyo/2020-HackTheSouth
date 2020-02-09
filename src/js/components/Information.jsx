import React from 'react'

class Information extends React.Component{
  constructor(props){
    super(props);
    this.state={
        name:'',
        capital:'',
        flag:'',
        id: '',
        capital: '',
        region: '',
        subregion: '',
        borders: '',
        language: '',
        currencies: '',
        population: '',
        clickout: false,
    }

  }



  componentDidMount(){
      this.getInfo(this.props.id);
  }


  componentWillReceiveProps(nextProps) {
      if(this.state.id !== nextProps.id) {
        this.getInfo(nextProps.id);
      }
  }


  getInfo = name => {
    const baseUrl = 'https://restcountries.eu/rest/v2/alpha/' + name.toLowerCase();
    fetch(baseUrl)
    .then(data => {
      if (data.ok) {
        return data.json();
      } else {
        throw new Error('Error getting data');
      }
    }).then(data => {
      this.setState({
        name: data.name,
        flag: data.flag,
        capital: data.capital,
        id: this.props.id,
        region: data.region,
        subregion: data.subregion,
        borders: data.borders.join(', '),
        language: data.languages[0].name,
        currencies: data.currencies[0].name,
        population: data.population,
      })
    }).catch(error => {
      console.log(error);
    });
  }

  render(){
      function clickHandler(e){
        e.preventDefault();
	console.log("WAS CLICKED");
        document.getElementById("popup").style.display = "none";
     }


	function noClick(e){
		console.log("NEEEEE");
		e.stopPropagation();
		e.naiveEvent.stopImmediatePropagation();
	}
      return <aside id="popup" onClick={clickHandler}>
        <div className="popup-inner" onClick={noClick}>
            <a href="" className="close" onClick={clickHandler}>
                lolxd
            </a>
            <h3>Pobierz Informator</h3>
		  
           

            <form name="pobranie" id="form-popup">
                <input type="email" placeholder="Adres email" name="email" id="popup-email"/>
                <input id="przycisk-pobierz" type="submit" value="POBIERZ" onClick=""/>
            </form> 

        	</div>    
    	</aside>
  }

}

module.exports = Information;
