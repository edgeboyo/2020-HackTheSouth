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
	retVal: '',
        gotten: false,
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
      });
	this.pullReq(data.name);
    }).catch(error => {
      console.log(error);
    });
  }

  pullReq = name => {
                const url = "https://map.edgeboyo.tk/pull.php?query=SELECT+*+FROM+databox+WHERE+`FIELD1`+LIKE+\"" + name + "\"";
	  console.log(url);
                fetch(url).then(res => {return res.text()}).then(txt => {
			var str = "";

			var spl = txt.split(",");

			if(spl[1].length != 0){
				var inc = "<img src=\"";
				if(spl[1].localeCompare("Visa Free")==0){
					inc += "Good.png";
				}
				if(spl[1].localeCompare("Required")==0 || spl[1].localeCompare("Visa Required")==0){
					inc += "Bad.png";
				}
				if(spl[1].localeCompare("Visa Upon arrival")==0){
                                        inc += "Neutral.png";
                                }
				inc+= "\"/>";
				str+= "Visa Requirement: " + spl[1] + " " + inc + "<br>";
			}

			if(spl[2].length != 0){
				str+= "World Risk Index: " + spl[2] + "<br>"; 
			}
			if(spl[3].length != 0){
				str+="Crime Risk Index: " + spl[3] + "<br>";
			}
			if(spl[4].length != 0){
                                str+="Safety Risk Index: " + spl[4] + "<br>";
                        }
			if(spl[5].length != 0){
                                str+="GDP-PPP($): " + spl[5] + "<br>";
                        }

			this.setState({retVal: str})});
	  	console.log(this.state.retVal);

        }
 
	createMarkup() {
                return {__html: this.state.retVal};
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
                <i className="fas fa-times fs-2x"></i>
            </a>
	    <div className="clearfix">
            <h3 className="f-left">{this.state.name}</h3>
	    <img className ="f-right" src={this.state.flag}/>
	    </div>
            <div className="clearfix"> 
	     <div className="f-left" dangerouslySetInnerHTML ={this.createMarkup()}/>
            </div>
        	</div>
    	</aside>
  }

}

module.exports = Information;
