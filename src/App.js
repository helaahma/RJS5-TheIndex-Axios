import React, { Component } from "react";

import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";

class App extends Component {
  state = {
    loading: true,
    currentAuthor: null,
    filteredAuthors: [],
    authors: []
  };

  handleFitch = async () => {
    try {
      let response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      this.setState({
        authors: response.data,
        filteredAuthors: response.data,
        loading: !this.state.loading
      });
    } catch (error) {
      console.error(error);
    }
  };

  selectAuthor = async authorId => {
    this.setState({ loading: true });
    try {
      let response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/" + authorId
      );

      this.setState({
        currentAuthor: response.data,
        loading: false
      });
      console.log(this.state.currentAuthor);
    } catch (error) {
      console.error(error);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
    console.log(this.state.filteredAuthors);
  };
  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else if (!this.state.loading) {
      return (
        <AuthorsList
          authors={this.state.filteredAuthors}
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
          authorsAPI={this.state.filteredAuthors}
        />
      );
    } else {
      return <Loading />;
    }
  };

  componentDidMount() {
    this.handleFitch();
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        {this.isLoading}
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
