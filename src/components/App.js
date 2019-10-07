import React from "react";
import { Item } from "./Item";
import { connect } from 'react-redux';
import { fetchDataItems } from '../redux/actions/gallaryItems';

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     items: [],
  //     isLoading: false,
  //     enableAutoRefresh: false,
  //     minComments: 0
  //   };
  // }
  state = {
    enableAutoRefresh: false,
    minComments: 0
  };

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    this.props.fetchData('https://www.reddit.com/r/reactjs.json?limit=100');
  };

  updateAutoRefresh = () => {
    this.setState(
      state => ({
        enableAutoRefresh: !state.enableAutoRefresh
      }),
      () => {
        if (this.state.enableAutoRefresh) {
          this.autoRefresh = setInterval(this.getItems, 3000);
        } else {
          clearInterval(this.autoRefresh);
        }
      }
    );
  };

  updateMinComments = event => {
    this.setState({
      minComments: Number(event.target.value)
    });
  };

  getItemsByComments = (items, minComments) =>
    items
      .filter(item => item.data.num_comments >= minComments)
      .sort((a, b) => b.data.num_comments - a.data.num_comments);

  render() {
    const { items, isLoading, enableAutoRefresh, minComments } = this.props;
    const itemsByComments = items && items.data && this.getItemsByComments(items.data.children, this.state.minComments);
    return (
      <div>
        <h1>Top commented</h1>
        <div>
          <p>Current filter: {this.state.minComments}</p>
          <button
            type="button"
            style={{ marginBottom: "15px" }}
            onClick={this.updateAutoRefresh}
          >
            {this.state.enableAutoRefresh ? "Stop" : "Start"} auto-refresh
          </button>
        </div>
        <input
          type="range"
          value={this.state.minComments}
          onChange={this.updateMinComments}
          min={0}
          max={500}
          style={{ width: "100%", marginBottom: "15px" }}
        />
        {isLoading ? (
          <p>...Loading</p>
        ) : itemsByComments && itemsByComments.length > 0 ? (
          itemsByComments.map(item => (
            <Item key={item.data.id} data={item.data} />
          ))
        ) : (
              <p>No results found matching your criteria</p>
            )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    isErrored: state.isErrored,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchDataItems(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);