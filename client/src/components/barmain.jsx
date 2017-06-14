import React, { Component } from 'react';
import parseDomain from 'parse-domain';

import { VictoryBar } from 'victory';

import BarInfo from './barinfo';

const NUM_BARS = 25;

class BarMain extends Component {
  render() {
    const renderLoading = () => (
      <div />
    );

    const renderBar = () => {
      let currentPages = [];
      const domains = [];
      const timeOnDomains = {};
      // let newDomain;
      let max = 0;
      let favorite;

      if (!this.props.chartAllResults) {
        currentPages = this.props.pages.slice(
          this.props.pageRanges[this.props.currentPage - 1].startIndex,
          this.props.pageRanges[this.props.currentPage - 1].endIndex + 1,
        );
      } else {
        currentPages = this.props.pages;
      }

      for (let i = 0; i < currentPages.length; i += 1) {
        const page = currentPages[i];
        const domain = parseDomain(page.url) ? parseDomain(page.url).domain : 'other';
        const timeEnd = Date.parse(page.time_closed) || Date.now();
        const timeLength = (timeEnd - Date.parse(page.time_open));

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
      }

      const domainNames = Array.from(Object.keys(timeOnDomains));
      domainNames.sort((a, b) => (timeOnDomains[b] - timeOnDomains[a]));
      const topDomains = domainNames.slice(0, NUM_BARS);

      topDomains.forEach((domain, idx) => {
        domains.push({
          x: idx,
          y: timeOnDomains[domain] / max,
          label: domain,
          domain,
        });
      });

      return (
        <div>
          <div className="container text-center">Time Spent Per Domain</div>
          <VictoryBar
            id="graph"
            data={domains}
            height={60}
            padding={{ top: 30, bottom: 8, left: 24, right: 36 }}
            scale={{ x: 'linear', y: 'sqrt' }}
            style={{
              data: {
                padding: 0,
                fill: () => {
                  const colors = [
                    '#455A64',
                    '#607D8B',
                    '#CFD8DC',
                    '#212121',
                    '#757575',
                    '#BDBDBD',
                  ];
                  const r = Math.floor(Math.random() * 6);
                  return colors[r];
                },
              },
              labels: {
                fontSize: 6,
                angle: 30,
                verticalAnchor: 'end',
                textAnchor: 'middle',
              },
              parent: {
                border: '0px solid #ccc',
              },
            }}
          />
          <BarInfo
            numberDomains={domains.length}
            numberPages={currentPages.length}
            favorite={favorite}
            chartAllResults={this.props.chartAllResults}
            chartPageResultsDispatcher={this.props.chartPageResultsDispatcher}
            chartAllResultsDispatcher={this.props.chartAllResultsDispatcher}
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
  currentPage: React.PropTypes.number,
  pageRanges: React.PropTypes.arrayOf(React.PropTypes.shape({
    startIndex: React.PropTypes.number,
    endIndex: React.PropTypes.number,
  })),
  pages: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  error: React.PropTypes.string,
  chartAllResults: React.PropTypes.bool,
  chartAllResultsDispatcher: React.PropTypes.func,
  chartPageResultsDispatcher: React.PropTypes.func,
};

BarMain.defaultProps = {
  isLoading: false,
  currentPage: 0,
  pageRanges: [],
  pages: [],
  error: '',
  chartAllResults: false,
  chartPageResultsDispatcher: () => {},
  chartAllResultsDispatcher: () => {},
};

export default BarMain;

