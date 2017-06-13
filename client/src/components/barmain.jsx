import React, { Component } from 'react';
import parseDomain from 'parse-domain';

import { VictoryBar } from 'victory';

import BarInfo from './barinfo';


class BarMain extends Component {
  render() {
    const renderLoading = () => (
      <div />
    );

    const renderBar = () => {
      const domains = [];
      const timeOnDomains = {};
      let newPage;
      let max = 0;
      let favorite;

      for (let i = 0; i < this.props.pages.length; i += 1) {
        const page = this.props.pages[i];
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


      const timeOnDomainsKeys = Object.keys(timeOnDomains);
      for (let j = 0; j < timeOnDomainsKeys.length; j += 1) {
        const domainP = timeOnDomainsKeys[j];
        if (domainP) {
          newPage = {
            x: j,
            y: timeOnDomains[domainP] / max,
            label: domainP,
            domain: domainP,
          };
          domains.push(newPage);
        }
      }

      return (
        <div>
          <BarInfo
            numberDomains={domains.length}
            numberPages={this.props.pages.length}
            favorite={favorite}
          />
          <VictoryBar
            id="graph"
            data={domains}
            height={50}
            padding={{ top: 20, bottom: 8, left: 24, right: 36 }}
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
                // angle: 2,
                verticalAnchor: 'end',
                textAnchor: 'middle',
              },
              parent: {
                border: '0px solid #ccc',
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
};

BarMain.defaultProps = {
  isLoading: false,
  pages: [],
  error: '',
};

export default BarMain;

