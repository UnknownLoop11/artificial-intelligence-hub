import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// UI
import Button from "../ui/Button";
import Input from "../ui/Input";
import Branding from "../ui/Branding";

// Icons
import {
  username as userIcon,
  password as passwordIcon,
  visibility,
  visibilityOff,
  login,
} from "../../assets";

// Services
import { signIn } from "../../services/authService";

// Redux
import { useDispatch } from "react-redux";
import { showToast } from "../../store/toastSlice";

const LoginForm = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form States
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  // Helper states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate Input
    let email, username;
    user.includes("@") ? (email = user) : (username = user);

    // API call
    try {
      const res = await signIn({ email, username, password });
      // Success
      dispatch(
        showToast({ message: "Logged In successfully!", type: "success" }),
      );
      // Store Token
      localStorage.setItem("token", res.token);
      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      dispatch(showToast({ message: error?.message || error, type: "error" }));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = () => {
    dispatch(showToast({ message: "Logged in as a Guest", type: "info" }));
    navigate("/chat");
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg flex-col justify-center">
      <form
        onSubmit={handleSubmit}
        className="dark:bg-primary/15 flex flex-col items-center justify-center gap-4 rounded-lg p-4 md:p-8 lg:shadow-inner"
      >
        {/* Branding */}
        <Branding />

        {/* Username or Email */}
        <Input
          name={"user"}
          type="text"
          placeholder={"Username or Email"}
          startAdornment={userIcon}
          required
          minLength={3}
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        {/* Password */}
        <Input
          name={"password"}
          type={showPassword ? "text" : "password"}
          placeholder={"Password"}
          startAdornment={passwordIcon}
          endAdornment={showPassword ? visibility : visibilityOff}
          onEndAdornmentClick={() => setShowPassword((prev) => !prev)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          maxLength={20}
          endAdornmentDescription={"Show/Hide Password"}
        />
        {/* Forgot Password */}
        <Link
          to="/forgot-password"
          className="text-dark dark:text-primary self-end text-sm font-semibold underline"
        >
          Forgot Password?
        </Link>
        {/* Login Button */}
        <div className="mt-4 space-y-2">
          <Button
            type="submit"
            text={"Login"}
            startIcon={login}
            className={"min-w-sm"}
            loading={loading}
          />
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-dark dark:text-primary font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>

        {/* OR (Divider) */}
        <div className="my-2 flex w-full items-center gap-1.5">
          <svg className="stroke-dark dark:stroke-light w-full" height={"1"}>
            <line x2={"100%"} strokeWidth={"1"} />
          </svg>
          OR
          <svg className="stroke-dark dark:stroke-light w-full" height={"1"}>
            <line x2={"100%"} strokeWidth={"1"} />
          </svg>
        </div>

        {/* Login as a Guest Button */}
        <Button
          text={"Login as a Guest"}
          startIcon={login}
          className={"min-w-sm"}
          onClick={loginAsGuest}
        />
      </form>
    </section>
  );
};

export default LoginForm;
