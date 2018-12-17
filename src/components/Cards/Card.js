import React from 'react';
import './style.sass';
import _ from 'lodash';

class Card extends React.Component {
  state = {
    number: {
      value: '',
      valid: false
    },
    date: {
      value: '',
      valid: false
    },
    cvv: {
      value: '',
      valid: false
    }
  };
  changeValue = (key, value) => {
    switch (key) {
      case 'number':
        if (Number.isInteger(+value) && value.length <= 16)
          this.setState({
            number: {
              ...this.state.number,
              valid: value.length === 16,
              value
            }
          });
        break;
      case 'date':
        if (Number.isInteger(+value) && value.length <= 4) {
          const [month, year] = _.chunk(value.split(''), 2).map(
            i => +i.join('')
          );
          let valid = true;
          valid = valid && +month > 0 && +month <= 12;
          valid = valid && +year >= 18 && +year <= 25;
          this.setState({
            date: {
              ...this.state.date,
              valid,
              value
            }
          });
        }
        break;
      case 'cvv':
        if (Number.isInteger(+value) && value.length <= 3) {
          this.setState({
            cvv: {
              ...this.state.cvv,
              valid: value.length === 3,
              value
            }
          });
        }
        break;
    }
  };
  onPayButtonClickHandler = () => {
    const [month, year] = _.chunk(this.state.date.value.split(''), 2)
      .map(v => +v.join(''))
      .map(v => +v);
    let cardInfo = {
      number: +this.state.number.value,
      cvv: +this.state.cvv.value,
      month,
      year
    };
    this.props.pay(cardInfo);
  };
  render() {
    const numberValue = _.chunk(this.state.number.value.split(''), 4)
      .map(four => four.join(''))
      .join(' ');
    const dateValue = _.chunk(this.state.date.value.split(''), 2)
      .map(two => two.join(''))
      .join('/');
    let buttonEnabled = true;
    _.forEach(this.state, item => {
      buttonEnabled = buttonEnabled && item.valid;
    });
    return (
      <div className="card">
        <input
          type="text"
          className="card-number"
          value={numberValue}
          onChange={e =>
            this.changeValue('number', e.target.value.split(' ').join(''))
          }
        />
        <input
          type="text"
          placeholder="MMYY"
          className="card-date"
          value={dateValue}
          onChange={e =>
            this.changeValue('date', e.target.value.split('/').join(''))
          }
        />
        <input
          type="password"
          placeholder="CVV"
          className="card-cvv"
          value={this.state.cvv.value}
          onChange={e => this.changeValue('cvv', e.target.value)}
        />
        <button
          className={`${buttonEnabled ? '' : 'disabled'} button green`}
          disabled={!buttonEnabled}
          onClick={this.onPayButtonClickHandler}
        >
          pay
        </button>
      </div>
    );
  }
}

export default Card;
