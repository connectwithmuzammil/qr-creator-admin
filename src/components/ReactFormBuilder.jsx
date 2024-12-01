import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ReviewFormBuilder = ({
  showCustomQuestion,
  setShowCustomQuestion,
  localQrData,
  setLocalQrData,
}) => {
  const { control, handleSubmit, reset } = useForm();
  const [questions, setQuestions] = useState([]);

  console.log("tesss", localQrData?.questions);

  useEffect(() => {
    if (localQrData?.questions) {
      // Ensure questions is always an array
      setQuestions(localQrData?.questions);
    }
  }, [localQrData]);

  useEffect(() => {
    setLocalQrData((prevData) => ({
      ...prevData,
      only_question: questions.map((q) => q.text),
    }));
  }, [questions, setLocalQrData]);

  console.log("questionsquestions", questions);

  const addQuestion = () => {
    if (
      questions.length === 0 ||
      questions[questions?.length - 1].text !== ""
    ) {
      const newQuestion = { text: "", type: "text", options: [] };
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

      setLocalQrData((prevData) => ({
        ...prevData,
        questions: [...prevData.questions, newQuestion],
        only_question: [...(prevData.only_question || []), newQuestion.text],
      }));
    } else {
      toast.error(
        "Please fill in the current question before adding a new one."
      );
    }
  };

  const handleQuestionChange = (index, field, value) => {
    // const cleanedValue = value.trim().replace(/\s+/g, ' ');

    const updatedQuestions = questions?.map((question, i) =>
      i === index ? { ...question, [field]: value } : question
    );
    setQuestions(updatedQuestions);

    // Update localQrData with the updated questions
    setLocalQrData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
      only_question: updatedQuestions.map((question) => question.text),
    }));
  };

  const addOption = (index) => {
    const updatedQuestions = questions?.map((question, i) =>
      i === index
        ? { ...question, options: [...question?.options, ""] }
        : question
    );
    // setQuestions({updatedQuestions});
    setLocalQrData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = questions?.map((question, i) => {
      if (i === qIndex) {
        const newOptions = question?.options?.map((opt, j) =>
          j === optIndex ? value : opt
        );
        return { ...question, options: newOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);

    setLocalQrData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions?.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);

    setLocalQrData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));

    reset();
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log("localqrdatachhe", localQrData);

  return (
    <div className="form-builder-container">
      {/* <h2 className="title">ADD REVIEW</h2> */}

      {showCustomQuestion && (
        <div className="question-section">
          <button className="add-question-btn" onClick={addQuestion}>
            Add Question
          </button>
          {questions?.map((question, index) => (
            <div key={index} className="question-card">
              <input
                type="text"
                placeholder={`Question ${index + 1}`}
                value={question.text}
                onChange={(e) =>
                  handleQuestionChange(index, "text", e.target.value)
                }
                className="input-field"
              />
              <select
                value={question.type}
                onChange={(e) =>
                  handleQuestionChange(index, "type", e.target.value)
                }
                className="input-field"
              >
                <option value="text">Text</option>
                <option value="radio">Radio</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="tel">Telephone</option>
                <option value="password">Password</option>
                <option value="date">Date</option>
                <option value="range">Range</option>
                <option value="file">File</option>
              </select>
              {(question?.type === "radio" || question.type === "dropdown") && (
                <div>
                  <button
                    className="add-option-btn"
                    onClick={() => addOption(index)}
                  >
                    Add Option
                  </button>
                  {question?.options.map((option, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, e.target.value)
                      }
                      className="input-field"
                    />
                  ))}
                </div>
              )}

              <div
                onClick={() => handleDeleteQuestion(index)}
                className="delete-question-btn"
              >
                <FaTrash color="#e0201c" size={22} /> {/* Delete icon */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <h3 className="preview-title">Preview:</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="form-preview">
        {questions.map((question, index) => (
          <div key={index} className="question-card">
            <p className="question-text">{question.text}</p>
            {question.type === "text" && (
              <Controller
                name={`question-${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Your answer here"
                    className="input-field"
                  />
                )}
              />
            )}
            {question.type === "radio" &&
              question.options.map((option, optIndex) => (
                <label key={optIndex} className="radio-label">
                  <Controller
                    name={`question-${index}`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="radio"
                        value={option}
                        className="radio-input"
                      />
                    )}
                  />
                  {option}
                </label>
              ))}
            {question.type === "dropdown" && (
              <Controller
                name={`question-${index}`}
                control={control}
                render={({ field }) => (
                  <select {...field} className="input-field">
                    {question.options.map((option, optIndex) => (
                      <option key={optIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />
            )}
            {question.type === "checkbox" && (
              <Controller
                name={`question-${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="checkbox"
                    className="checkbox-input"
                  />
                )}
              />
            )}
            {question.type === "number" && (
              <Controller
                name={`question-${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Number"
                    className="input-field"
                  />
                )}
              />
            )}
            {question.type === "email" && (
              <Controller
                name={`question-${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="input-field"
                  />
                )}
              />
            )}
            {question.type === "tel" && (
              <Controller
                name={`question-${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="tel"
                    placeholder="Telephone"
                    className="input-field"
                  />
                )}
              />
            )}
            {question.type === "password" && (
              <Controller
                name={`question-${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className="input-field"
                  />
                )}
              />
            )}
            {question.type === "date" && (
              <Controller
                name={`question-${index}`}
                control={control}
                render={({ field }) => (
                  <input {...field} type="date" className="input-field" />
                )}
              />
            )}
            {question.type === "range" && (
              <Controller
                name={`question-${index}`}
                control={control}
                render={({ field }) => (
                  <input {...field} type="range" className="input-field" />
                )}
              />
            )}
            {question.type === "file" && (
              <Controller
                name={`question-${index}`}
                control={control}
                render={({ field }) => (
                  <input {...field} type="file" className="input-field" />
                )}
              />
            )}
          </div>
        ))}
        <button type="submit" className="submit-btn d-none">
          Submit
        </button>
      </form> */}
    </div>
  );
};

export default ReviewFormBuilder;
