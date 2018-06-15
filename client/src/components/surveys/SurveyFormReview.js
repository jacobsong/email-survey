import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({ onBack, formValues, submitSurvey }) => {
  const reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat white-text" onClick={onBack}>
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => submitSurvey(formValues)}
      >
        Send Survey
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(SurveyFormReview);
