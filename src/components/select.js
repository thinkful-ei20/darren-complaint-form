import React from 'react';

export default class Select extends React.Component {
    // componentDidUpdate(prevProps) {
    //     if (!prevProps.meta.active && this.props.meta.active) {
    //         this.input.focus();
    //     }
    // }
    
    render() {
        // console.log(this.props);
        // const Element = this.props.element || 'select';

        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <div className="form-error">{this.props.meta.error}</div>;
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
                <div className="form-warning">{this.props.meta.warning}</div>
            );
        }

        const renderSelectOptions = (key,index) => {
          return (
            <option
              key={`${index}-${key}`}
              value={key.replace(/_/g,'-')}
            >
              {this.props.options[key]}
            </option>
          );
        }

        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                    {error}
                    {warning}
                </label>
                <select {...this.props.input}>
                  <option>Select One</option>
                  {Object.keys(this.props.options).map(renderSelectOptions)}
                </select>
    
            </div>
        );
    }
}
