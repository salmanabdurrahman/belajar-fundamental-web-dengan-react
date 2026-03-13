import PropTypes from "prop-types";

function StatusMessage({ message, variant = "info" }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`status-message status-message--${variant}`} role="alert">
      {message}
    </div>
  );
}

StatusMessage.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.oneOf(["error", "info", "success"]),
};

export default StatusMessage;
