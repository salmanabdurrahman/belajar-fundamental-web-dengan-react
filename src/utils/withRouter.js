import { useParams, useNavigate } from "react-router-dom";
import { createElement } from "react";

/**
 * HOC that injects routing hooks (useParams, useNavigate) as props
 * Allows class components to access route parameters and navigation
 */
export default function withRouter(Component) {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return createElement(Component, { ...props, params, navigate });
  };
}
