import React, {Component} from 'react';
import {Button} from 'react-native';
import translate from '../translator/translate';

export default class ButtonUI extends Component {
  render() {
    return <Button title={translate(this.props.title_tag)} {...this.props} />;
  }
}
