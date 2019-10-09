import React from "react";
import { Item } from "./Item";
import { connect } from 'react-redux';
import { fetchDataItems } from '../redux/actions/gallaryItems';
import "../css/mainStyle.css"
import { Spin, Button, Slider } from "./antd";
import { Options } from "istanbul-reports";
import FormAddGallaryItem from './forms/FormAddGallaryItem'

interface IProps {
  num_comments?: number;
  permalink?: string;
  thumbnail?: string;
  title?: string;
  filter?: Options | undefined;
  items?: any;
  isLoading?: boolean;
  fetchData?: any;
  enableAutoRefresh?: boolean;
}

interface IState {
  enableAutoRefresh: boolean;
  isOpenForm: boolean;
  minComments: number;
  maxComments: number;
}

class App extends React.Component<IProps, IState> {

  private autoRefresh: number | undefined;

  state = {
    enableAutoRefresh: false,
    isOpenForm: false,
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

  handleOpenForm = () => {
    this.setState({ isOpenForm: true })
  }
  onHandleCloseForm = () => {
    this.setState({ isOpenForm: false })
  }

  updateMinComments = (event: any) => {
    this.setState({
      minComments: Number(event[0]),
      maxComments: Number(event[1]),
    });
  };

  getItemsByComments = (items: any, minComments: number, maxComments: number) =>
    items
      .filter((item: any) => item.data.num_comments >= minComments && item.data.num_comments <= maxComments)
      .sort((a: any, b: any) => b.data.num_comments - a.data.num_comments);

  render() {
    const { items, isLoading, enableAutoRefresh } = this.props;
    const itemsByComments = items && this.getItemsByComments(items, this.state.minComments, this.state.maxComments);
    return (
      <div className="mainPage">
        <h1>Top commented</h1>
        <div>
          <p>Current filter: {this.state.minComments} ... {this.state.maxComments}</p>
          <Button
            style={{ marginBottom: "15px" }}
            onClick={this.updateAutoRefresh}
          >
            {this.state.enableAutoRefresh ? "Stop" : "Start"} auto-refresh
          </Button>
          <Button
            style={{ marginBottom: "15px" }}
            onClick={this.handleOpenForm}
          >
            add item
          </Button>
        </div>
        <Slider range min={0} max={500}
          defaultValue={[this.state.minComments, this.state.maxComments]}
          style={{ marginLeft: 10, marginRight: 10, width: 'calc(100% - 20px)' }}
          onChange={this.updateMinComments}
        />
        <div className="gallaryFlex">
          {isLoading ?
            <Spin size="default" />
            : itemsByComments && itemsByComments.length > 0 ? (
              itemsByComments.map((item: any) => (
                <Item key={item.data.id} data={item.data} />
              ))
            ) : (
                <p>No results found matching your criteria</p>
              )}
        </div>
        {this.state.isOpenForm ? <FormAddGallaryItem visible={this.state.isOpenForm} onHandleCloseForm={this.onHandleCloseForm} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    items: state.items,
    isErrored: state.isErrored,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchData: (url: string) => dispatch(fetchDataItems(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);