const Button = ({ children, variant = 'primary', loading, ...props }) => {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    destructive: 'btn-destructive',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  }[variant] || 'btn-primary';

  return (
    <button
      disabled={loading || props.disabled}
      className={`${variantClass} ${props.className || ''}`}
      {...props}
    >
      {loading && (
        <div className="spinner-small"></div>
      )}
      {children}
    </button>
  );
};

export default Button;