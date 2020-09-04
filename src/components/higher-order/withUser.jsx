import React, { Component } from 'react';
import { loadUser } from '@/actions/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function withUser(WrappedComponent, authRequired = false) {
  class withUserComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        user: this.props.user,
        mounted: true,
      };

      this.getUser = this.getUser.bind(this);
    }
    getUser = async function () {
      if (!this.state.user.loggedIn) {
        //get userId from localStorage
        const id = localStorage.getItem('vendo_id');
        if (id && this.state.mounted) {
          const userObj = await this.props.loadUser(id);
          if (!userObj && authRequired) {
            const match = this.props.match;
            const path = match.url;
            localStorage.setItem('vendo_prev_location_url', path);
            this.props.history.push('/auth');
          }
          // if (this.state.mounted) {
          return this.setState((state) => {
            return {
              user: {
                ...state.user,
                user: userObj,
                loggedIn: true,
              },
            };
          });
          // }
        } else if (!id && this.state.mounted && authRequired) {
          const match = this.props.match;
          const path = match.url;
          localStorage.setItem('vendo_prev_location_url', JSON.stringify(path));
          this.props.history.push('/auth');
        }
      }
    };
    componentDidMount() {
      return this.getUser();
    }
    componentWillUnmount() {
      return this.setState((state) => {
        return {
          ...state,
          mounted: false,
        };
      });
    }
    render() {
      return <WrappedComponent user={this.state.foundUser} {...this.props} />;
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      loadUser: (arg) => dispatch(loadUser(arg)),
    };
  };

  const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withRouter(withUserComponent));
}

export default withUser;
