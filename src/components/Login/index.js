import React from 'react';
import './style.sass';
import _ from 'lodash';
import ConfirmButton from './ConfirmButton';
import {connect} from 'react-redux';
import {BeatLoader} from 'react-spinners';

class Login extends React.Component {
  state = {
    mode: 'login',
    values: {
      email: {
        value: '',
        valid: false,
        touched: false,
        visible: true
      },
      name: {
        value: '',
        valid: false,
        touched: false,
        visible: false
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        visible: true
      },
      confirmPassword: {
        value: '',
        valid: false,
        touched: false,
        visible: false
      }
    }
  };
  toggleMode = () => {
    if (this.state.mode === 'login')
      this.setState({
        mode: 'signup',
        values: {
          ...this.state.values,
          confirmPassword: {
            ...this.state.confirmPassword,
            visible: true
          },
          name: {
            ...this.state.confirmPassword,
            visible: true
          }
        }
      });
    else
      this.setState({
        mode: 'login',
        values: {
          ...this.state.values,
          confirmPassword: {
            ...this.state.confirmPassword,
            visible: false
          },
          name: {
            ...this.state.confirmPassword,
            visible: false
          }
        }
      });
  };
  fieldBluredHandler = field => {
    this.setState({
      values: {
        ...this.state.values,
        [field]: {...this.state.values[field], touched: true}
      }
    });
  };
  fieldChangedHandler = (field, value) => {
    let valid = false;
    const trimmedValue = value.trim();
    switch (field) {
      case 'name':
        valid = trimmedValue.length > 3;
        break;
      case 'email':
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        valid = re.test(String(trimmedValue).toLowerCase());
        break;
      case 'password':
        valid = trimmedValue.length >= 6;
        break;
      case 'confirmPassword':
        valid = trimmedValue === this.state.values.password.value;
        break;
      default:
        break;
    }
    this.setState({
      values: {
        ...this.state.values,
        [field]: {...this.state.values[field], value, valid}
      }
    });
  };
  render() {
    const {pending, error} = this.props.ui;
    let statusContent = null;
    if (pending)
      statusContent = (
        <BeatLoader
          sizeUnit={'px'}
          size={20}
          color={'#36D7B7'}
          loading={true}
        />
      );
    else if (error) statusContent = error;
    return (
      <div className="wrap">
        <button className="toggle" onClick={this.toggleMode}>
          {this.state.mode === 'login' ? 'signup' : 'login'}
        </button>
        {_.map(this.state.values, (value, key) => (
          <Input
            onFieldBlur={this.fieldBluredHandler}
            onFieldChange={this.fieldChangedHandler}
            fieldName={key}
            field={value}
          />
        ))}
        <ConfirmButton {...this.state} history={this.props.history} />
        <div style={{marginTop: 20, color: 'red'}}>{statusContent}</div>
      </div>
    );
  }
}

const Input = ({onFieldBlur, onFieldChange, fieldName, field}) => {
  const {visible, valid, touched, value} = field;
  const classes = [!visible && 'hidden', !valid && touched && 'invalid'];
  const className = classes.join(' ');
  return (
    <input
      onBlur={() => onFieldBlur(fieldName)}
      onChange={e => onFieldChange(fieldName, e.target.value)}
      className={className}
      type={
        fieldName === 'password' || fieldName === 'confirmPassword'
          ? 'password'
          : 'text'
      }
      placeholder={fieldName}
      value={value}
    />
  );
};

export default connect(state => ({
  ui: state.ui.login
}))(Login);
