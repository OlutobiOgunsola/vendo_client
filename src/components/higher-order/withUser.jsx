import React, { Component } from 'react';
import { loadUser } from '@/actions/user';
import { connect } from 'react-redux';

function withUser(WrappedComponent) {
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
          this.setState((state) => {
            return {
              user: {
                ...state.user,
                user: userObj,
              },
            };
          });
        }
      }

      console.log('state', this.state);
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
  return connect(mapStateToProps, mapDispatchToProps)(withUserComponent);
}

export default withUser;
