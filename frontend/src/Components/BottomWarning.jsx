/* eslint-disable react/prop-types */
import {Link} from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <footer className="text-center mt-4">
      {label}
      <Link className="underline underline-offset-1" to={to}>
        {buttonText}
      </Link>
    </footer>
  );
}

