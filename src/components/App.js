import React, { Component } from 'react';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import Input from './input';
import Select from './select';
import { required, nonEmpty, areNumbers, hasFive, textarea } from '../validators';


import './App.css';

export class App extends React.Component {

  onSubmit(values){
    // console.log('Here are the values: ', values);
    
    return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          if (
              res.headers.has('content-type') &&
              res.headers
                  .get('content-type')
                  .startsWith('application/json')
          ) {
              // It's a nice JSON error returned by us, so decode it
              return res.json().then(err => Promise.reject(err));
          }
          // It's a less informative error returned by express
          return Promise.reject({
              code: res.status,
              message: res.statusText
          });
      }
      return;
      })
      // .then(() => console.log("submitted with values: ", values))
      .catch(err => {
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
            // Convert ValidationErrors into SubmissionErrors for Redux Form
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
        return Promise.reject(
            new SubmissionError({
                _error: 'Error submitting message'
            })
        );
    });
  }

  render() {

    let successMessage;
    if (this.props.submitSucceeded) {
        successMessage = (
            <div className="message message-success">
                Message submitted successfully
            </div>
        );
    }

    let errorMessage;
    if (this.props.error) {
        errorMessage = (
            <div className="message message-error">{this.props.error}</div>
        );
    }
    return (
      <div>

        <h2>Report a Problem with your delivery</h2>
        <form onSubmit={this.props.handleSubmit(values => 
          this.onSubmit(values)
        )}>
        {successMessage}
        {errorMessage}
          <Field 
            name='trackingNumber'
            type='text'
            component={Input}
            label='Tracking Number'
            validate={[required, nonEmpty, areNumbers, hasFive]}
          />
          <Field 
            name='issue'            
            component={Select}
            label='What is your issue?'
            options= {{
              not_delivered: 'My delivery hasn\'t arrived',
              wrong_item: 'The wrong item was delivered',
              missing_part: 'Part of my order was missing',
              damaged: 'Some of my order arrived damaged',
              other: 'Other (give details below)' 
            }}
          />
          <Field 
            name='details'   
            label='Give more details (optional)'         
            component={Input}
            element='textarea'
            validate={[textarea]}
          />
          <button type='submit' disabled={this.props.pristine || this.props.submitting}>
            Submit
          </button>

        </form> 

      </div> 

    );
  }
}

export default reduxForm({
  form: 'complaintForm',
  onSubmitFail: (errors, dispatch) =>
        dispatch(focus('complaintForm', Object.keys(errors)[0]))
})(App);
