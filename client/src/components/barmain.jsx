import React, { Component } from 'react';

import { VictoryBar, VictoryLabel, Bar } from 'victory';

import BarInfo from './barinfo';
import CustomBar from './barcustom';

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

    console.log('well see this: ', this.props.pages);

    const renderBar = () => {

      let domains = [];
      let timeOnDomains = {};
      let newPage;
      let max = 0;
      let favorite;
      let j = 0;

      for (var i = 0; i < this.props.pages.length; i++) {
        let page = this.props.pages[i];
        let domain = parseDomain(page.url) ? parseDomain(page.url).domain : 'other';
        if (!parseDomain(page.url)) {
          console.log(page.url);
        }
        let timeEnd = page.time_closed || Date.now();
        let timeLength = (timeEnd - Date.parse(page.time_open));
        if (timeOnDomains[domain]) {
          timeOnDomains[domain] += timeLength;
          if (timeOnDomains[domain] > max) {
            max = timeOnDomains[domain];
            favorite = domain[0].toUpperCase() + domain.slice(1);
          }
        } else if (!timeOnDomains[domain]) {
          timeOnDomains[domain] = timeLength;
          if (timeOnDomains[domain] > max) {
            max = timeOnDomains[domain];
            favorite = domain[0].toUpperCase() + domain.slice(1);
          }
        }
      };

      for (var domain in timeOnDomains) {
        if (domain !== 'other') {
          newPage = {
            x: j,
            y: timeOnDomains[domain]/max,
            label: domain,
            domain: domain,
          };
          j++;
          console.log(domain);
          domains.push(newPage);
        }
      };
/////////////////
      return (
        <div>
          <br />
          <h2>Domains in history</h2>
          <BarInfo
            numberDomains={domains.length}
            numberPages={this.props.pages.length}
            favorite={favorite}
          />
          <VictoryBar
            data={domains}
            events={[{
              target: "data",
              eventHandlers: {
                onMouseEnter: (datum) => {
                    console.log('hi', datum.domain);
                  }
                }
              }
            ]}

            height={55}
            padding={{top: 3, bottom: 8, left: 8, right: 8}}
            scale={{x: "linear", y: "sqrt"}}

            style={{
              data: {
                padding: 0,
                fill: () => {
                  const colors = [
                    "#455A64",
                    "#607D8B",
                    "#CFD8DC",
                    "#FF5722",
                    "#212121",
                    "#757575",
                    "#BDBDBD",
                  ]
                  let r = Math.floor(Math.random()*7);
                  return colors[r];
                },
              },
              labels: {
                fontSize: 6,
                angle: 60,
                verticalAnchor: "end",
                textAnchor: "end",
                // text: "domain",
              },
              parent: {
                border: "1px solid #ccc",
              },
            }}
          />
        </div>
        );
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
