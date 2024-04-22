import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Register.css"

const Register = ({ validateUser }) => {

  const [user, setUser] = useState({})

  return (
    <>
      <div style={{ backgroundColor: "silver", minHeight: "662px" }} className="register-div">
        <form onSubmit={(e) => e.preventDefault} style={{ maxWidth: "600px" }} className="container-fluid rg-inp-div">
          <h3 style={{ color: "silver" }}>REGISTER</h3><br />
          <div>
            <div>
              <input
                type="text"
                name="username"
                placeholder="User Name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              /><br /><br />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="E Mail"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              /><br /><br />
            </div>
            <div>
              <input
                type="number"
                name="mobileNumber"
                placeholder="Mobile Number"
                onChange={(e) => setUser({ ...user, mnumber: e.target.value })}
              /><br /><br />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              /><br /><br />
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Conform Password"
                onChange={(e) => setUser({ ...user, Cpassword: e.target.value })}
              /><br /><br />
            </div><br />
            <span>Already have an account? <Link to={'/Login'} className="Click">Click Here</Link> </span>
            <br /><br />
            <Button variant="secondary" onClick={() => validateUser(user.name, user.email, user.mnumber, user.password, user.Cpassword)} > Submit </Button>
          </div>

        </form>
      </div>
    </>
  );
};

export default Register;