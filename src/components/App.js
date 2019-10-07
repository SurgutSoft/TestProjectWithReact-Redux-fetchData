import React from "react";
import { Item } from "./Item";
import { connect } from 'react-redux';
import { fetchDataItems } from '../redux/actions/gallaryItems';
import "../css/mainStyle.css"
import { Spin, Button, Slider } from "./antd";

class App extends React.Component {
  state = {
    enableAutoRefresh: false,
    minComments: 0,
    maxComments: 500,
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
      minComments: Number(event[0]),
      maxComments: Number(event[1])
    });
  };

  getItemsByComments = (items, minComments, maxComments) =>
    items
      .filter(item => item.data.num_comments >= minComments && item.data.num_comments <= maxComments)
      .sort((a, b) => b.data.num_comments - a.data.num_comments);

  render() {
    const { items, isLoading, enableAutoRefresh, minComments } = this.props;
    const itemsByComments = items && items.data && this.getItemsByComments(items.data.children, this.state.minComments, this.state.maxComments);
    return (
      <div className="mainPage">
        <h1>Top commented</h1>
        <div>
          <p>Current filter: {this.state.minComments} ... {this.state.maxComments}</p>
          <Button
            type="button"
            style={{ marginBottom: "15px" }}
            onClick={this.updateAutoRefresh}
          >
            {this.state.enableAutoRefresh ? "Stop" : "Start"} auto-refresh
          </Button>
        </div>
        <Slider range min={0} max={500}
          defaultValue={[this.state.minComments, this.state.maxComments]}
          style={{ marginLeft: 10, marginRight: 10, width: 'calc(100% - 20px)' }}
          onChange={this.updateMinComments}
          >

        </Slider>
        {/* <input
          type="range"
          value={this.state.minComments}
          onChange={this.updateMinComments}
          min={0}
          max={500}
          style={{ width: "100%", marginBottom: "15px" }}
        /> */}
        <div className="gallaryFlex">
          {isLoading ?
            <Spin size="default" />
            : itemsByComments && itemsByComments.length > 0 ? (
              itemsByComments.map(item => (
                <Item key={item.data.id} data={item.data} />
              ))
            ) : (
                <p>No results found matching your criteria</p>
              )}
        </div>
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