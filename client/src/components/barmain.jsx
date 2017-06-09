import React, { Component } from 'react';

import { VictoryBar, VictoryLabel } from 'victory';

import parseDomain from 'parse-domain';


class BarMain extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    const renderLoading = () => (
      <div>
        Loading...
      </div>
    );

    // var pages = [];

    console.log('well see this: ', this.props.pages);


    const renderBar = () => {

      // debugger;
      
      let newPage;
      // let domain;


      const pages = this.props.pages.slice(0, 10).map(function(page, i) {
        let timeEnd = page.time_closed || Date.now();
        let timeLength = (timeEnd - Date.parse(page.time_open))/ 216000;
        let domain = parseDomain(page.url) ? parseDomain(page.url).domain : 'unknown';
        console.log(timeLength);
        console.log(domain)
        newPage = {
          x: i,
          y: timeLength,
          label: domain,
        };
        return newPage;    
      })

      // for (let pago in this.props.pages) {
      //   console.log('page: ', pago);
      //   newPage = {
      //     x: 1,
      //     y: 2,
      //     label: 'funLabel',
      //   };
      //   console.log('newPage: ', newPage);
      //   pages.push(newPage);
      // };

      const data2 = [
        {x: 1, y: 3, label: "Alpha"},
        {x: 2, y: 4, label: "Bravo"},
        {x: 3, y: 6, label: "Charlie"},
        {x: 4, y: 3, label: "Delta"},
        {x: 5, y: 7, label: "Echo"},
      ]


      return (
        <VictoryBar
          data={pages}
          labelComponent={<VictoryLabel angle={90} verticalAnchor="middle" textAnchor="end"/>}
        />);
    };

    if (this.props.error) {
      return this.props.error;
    }
    return this.props.isLoading ? renderLoading() : renderBar();
  }
}

BarMain.propTypes = {
  isLoading: React.PropTypes.bool,
  pages: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  error: React.PropTypes.string,
  deletePage: React.PropTypes.func,
  sortPages: React.PropTypes.func,
};

BarMain.defaultProps = {
  isLoading: false,
  pages: [],
  error: '',
  deletePage: () => {},
  sortPages: () => {},
};

export default BarMain;