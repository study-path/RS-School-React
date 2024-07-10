import React from "react";
import "./Search.css";

interface DataItem {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface State {
  data: DataItem[];
  error: string | null;
}

class Search extends React.Component<State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      error: null,
    };
  }

  inputRef = React.createRef();

  componentDidMount() {
    //this.readLsAndSetSearchBox();
    //this.getData();
  }

  readLsAndSetSearchBox = () => {
    const inputValue = localStorage.getItem("searchTerm");
    this.inputRef.current.value = inputValue;
  };

  getData = () => {
    fetch("https://swapi.dev/api/people")
      .then((response) => response.json())
      .then((response) => {
        this.setState(() => ({ data: response.results }));
      })
      .catch((error) => console.error("Error:", error));
  };

  readSearchBoxAndSetLs = () => {
    localStorage.setItem("searchTerm", this.inputRef.current.value);
  };

  clickSearch = () => {
    this.readSearchBoxAndSetLs();
    this.getData();
  };

  render() {
    return (
      <div>
        <section style={{ height: "100px" }}>
          <div>
            <input
              type="text"
              ref={this.inputRef}
              name="search"
              placeholder="Search"
            ></input>
            <button onClick={this.clickSearch}>Search</button>
          </div>
        </section>
        <section style={{ height: "400px" }}>
          <ul>
            {this.state.data.map((d) => (
              <li key={d.url}>{d.name}</li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
export default Search;
