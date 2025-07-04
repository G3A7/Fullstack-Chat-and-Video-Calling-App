import { useState } from "react";
import { Loader, ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
function SignupPage() {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signupMutation, error, isPending } = useSignup();
  const handleSignup = async (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };
  return (
    <div
      className="h-screen flex justify-center items-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full  max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Signup Form - Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text  text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Stramify
            </span>
          </div>
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error?.response?.data?.message || error.message}</span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join to Stramify and start your language learning adventure
                  </p>
                </div>
                <div className="space-y-3">
                  {/* Full Name */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-borderd w-full"
                      placeholder="Ahmed Mousa"
                      value={signupData.fullName}
                      onChange={(e) => {
                        setSignupData((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text"> Email</span>
                    </label>
                    <input
                      type="email"
                      className="input input-borderd w-full"
                      placeholder="Ahmed@gmail.com"
                      value={signupData.email}
                      onChange={(e) => {
                        setSignupData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                      required
                    />
                  </div>
                  {/* password */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      className="input input-borderd w-full"
                      placeholder="******"
                      value={signupData.password}
                      onChange={(e) => {
                        setSignupData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                      }}
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>
                  {/* terms condition and Privacy Policy */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline ">
                          Terms of service and{" "}
                        </span>
                        <span className="text-primary hover:underline">
                          Privacy Policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Signup Form - Right Side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/i.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
