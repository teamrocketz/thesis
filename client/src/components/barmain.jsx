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
      
      let newPage;
      let max = 0;

      let domains = [];

      for (var page in this.props)


      for (var i = 0; i < this.props.pages.length; i++) {
        let page = this.props.pages[i];
        let timeEnd = page.time_closed || Date.now();
        let timeLength = (timeEnd - Date.parse(page.time_open));
        if (timeLength > max) {
          max = timeLength;
        }
      };

      console.log('max = ', max);

      const pages = this.props.pages.map(function(page, i) {
        let timeEnd = page.time_closed || Date.now();
        let timeLength = (timeEnd - Date.parse(page.time_open))/ max;
        let domain = parseDomain(page.url) ? parseDomain(page.url).domain : 'other';
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
          events={[{
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [{
                  target: "labels",
                  mutation: () => {
                    console.log('clickedo')
                    }
                  }];
                }
              }
            }
          ]}

          height={200}
          padding={10}
          scale={{x: "linear", y: "linear"}}
          style={{
            data: {
              padding: 0,
              fill: "black",
            },
            labels: {
              fontSize: 8,
              angle: 90,
              verticalAnchor: "middle",
              textAnchor: "beginning",
            },
            parent: {
              border: "1px solid #ccc", 
            },
          }}
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