import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function Layout() {
  return (
    <div>
      <div>
        <Link style={{ textDecoration: 'none' }} to="/">
          <Button  variant="text" href="/">
            Home Page
          </Button>
        </Link>
      </div>
      <div>
        <Link style={{ textDecoration: "none" }} to="/signin">
          <Button variant="contained" href="/signin">
            Signin Page
          </Button>
        </Link>
      </div>
      <div>
        <Link style={{ textDecoration: "none" }} to="/account">
          <Button variant="outlined" href="/account">
            Account Page
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Layout;
