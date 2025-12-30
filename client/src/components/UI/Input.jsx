const Input = ({ label, error, ...props }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input
        {...props}
        className={error ? 'error-input' : ''}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;