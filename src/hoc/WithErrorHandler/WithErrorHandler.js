import React, { Component } from 'react';

import axios from 'axios';
import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(null, req => {
                this.setState({error: null});
                
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : ''}
                    </Modal>
                    <WrappedComponent {...this.props} > </WrappedComponent>
                </> 
            )
        }
               
    }
}

export default WithErrorHandler;