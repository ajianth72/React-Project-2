import React, { useState, useEffect } from 'react';
import Button from '../../UI/Button/Button';
import './CourseInput.css';

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  useEffect(() => {
    if (!isTouched) {
      setIsAddButtonDisabled(true);
    } else {
      setIsAddButtonDisabled(enteredValue.trim().length === 0);
    }
  }, [isTouched, enteredValue]);

  const goalInputChangeHandler = (event) => {
    if (!isTouched) {
      setIsTouched(true);
    }
    setEnteredValue(event.target.value);
    setIsValid(event.target.value.trim().length > 0);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
    setIsTouched(false);
    setEnteredValue('');
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`form-control ${!isValid && isTouched ? 'invalid' : ''}`}
      >
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button
        type="submit"
        style={{ backgroundColor: isAddButtonDisabled ? 'lightgray' : 'red' }}
        disabled={isAddButtonDisabled}
      >
        Add Goal
      </Button>
    </form>
  );
};

export default CourseInput;


