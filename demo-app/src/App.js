import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadDataHandle, findData } from './actions/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.findata = this.findata.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  findata(e) {
    this.props.dispatch(findData(e.target.value));
  }

  onChange(e) {
    const { dispatch } = this.props;
    dispatch(loadDataHandle(e.target.value));
  }

  refreshData() {
    this.props.dispatch(loadDataHandle(''));
  }

  render() {
    const { isLoading, data, lastUpdate, dataFind } = this.props;
    return (
      <div className="App">
        Find data from server: <input onChange={this.onChange} />
        <button onClick={this.refreshData} >Refresh</button>
        <br/>
        Find data offline: <input onChange={this.findata} />
        <div>
          <b>Last update: </b> { new Date(lastUpdate).toLocaleTimeString() }
        </div>
        { isLoading && (
            <h3>Loading...</h3>
          )
        }
        { !isLoading && (
            <div>
              <ul>
                { dataFind.map( (item, key) => (
                  <li key={key}>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
        )}
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { loadDataReducer } = state;
  // const { isLoading, data, lastUpdate, findData } = loadDataReducer;
  return {
    ...loadDataReducer
  }
}

export default connect(mapStateToProps)(App);
