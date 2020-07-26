import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function withLogin(WrappedComponent) {
  class withLoginComponent extends Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      const vendo_id = localStorage.getItem('vendo_id');
      if (!vendo_id) {
        this.props.history.push('/auth');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(withLoginComponent);
}

export default withLogin;
