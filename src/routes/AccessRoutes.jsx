import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ authUser, children }) {
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicRoute({ authUser, children }) {
  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};

PublicRoute.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};

ProtectedRoute.defaultProps = {
  authUser: null,
};

PublicRoute.defaultProps = {
  authUser: null,
};

export { ProtectedRoute, PublicRoute };
