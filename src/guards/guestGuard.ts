import PropTypes from "prop-types";
import { useRouter } from "next/router";
// redux
import { useSelector } from "react-redux";
// routes
import { PATH_PAGE } from "../routes/paths";
import { AuthContext } from "src/contexts/AuthContext";
import { useContext } from "react";

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ ...props }) {
  const { children } = props;
  const { push, query } = useRouter();
  // type error
  const { isAuthenticated }: any = useContext(AuthContext);

  if (isAuthenticated) {
    push((query?.redirect as string) || PATH_PAGE.root);
  }

  return children;
}
