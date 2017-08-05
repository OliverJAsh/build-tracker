import { defaultStyles } from './theme';
import SparkLine from './charts/SparkLine';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { View } from 'react-native';

const bundles = ['main', 'shared', 'bundle.App'];

export default class Bundles extends Component {
  render() {
    return (
      <View>
        {bundles.map(bundle =>
          <Link key={bundle} style={defaultStyles.link} to={`/bundles/${bundle}`}>
            {bundle}
            <SparkLine />
          </Link>
        )}
      </View>
    );
  }
}
