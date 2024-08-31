import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { forgotPassword, otpVerification } from "../services/user-service";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified,setOtpVerified]=useState(false)
  const [isSubmit,setIsSubmit] = useState(false)

  const handleOnChange = (event, field) => {
    if (field === "email") {
      setEmail(event.target.value);
    } else if (field === "otp") {
      setOtp(event.target.value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (email.trim() === "") {
      toast.error("Please enter the email");
      return;
    }
    setIsSubmit(true)
    forgotPassword(email)
      .then((data) => {
        setIsSubmit(false)
        toast.success("OTP has been sent to your email");
        setOtpSent(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    if (otp.trim() === "") {
      toast.error("Please enter the OTP");
      return;
    }
    // Add your OTP verification logic here
    otpVerification(otp,email)
    .then((data)=>{
        toast.success(data)
    })
    .catch((error)=>{
        console.log(error);
        toast.error("something went wrong");
    })
    // toast.success("OTP verified successfully");
  };

  return (
    <div className="flex justify-center items-center mt-16 min-h-[59vh]">
      <Card color="transparent" className="p-4 w-full md:w-2/3 lg:w-1/3">
        {!otpSent ? (
          <>
            <Typography color="gray" className="mt-1 font-bold">
              Find Your Account
            </Typography>
            <hr className="w-full" />
            <form className="mt-6 mb-2 w-full" onSubmit={handleFormSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Enter your email
                </Typography>
                <Input
                  size="lg"
                  id="email"
                  placeholder="email"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  onChange={(e) => handleOnChange(e, "email")}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={email}
                  name="email"
                />
              </div>
              {isSubmit?<Button  className="mt-6" fullWidth>
                Sending otp ...
              </Button>:<Button type="submit" className="mt-6" fullWidth>
                Get OTP
              </Button>}
              
            </form>
          </>
        ) : !otpVerified ?((
            <>
              <Typography color="gray" className="mt-1 font-bold">
                Verify OTP
              </Typography>
              <hr className="w-full" />
              <form className="mt-6 mb-2 w-full" onSubmit={handleOtpSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Enter the OTP sent to your email
                  </Typography>
                  <Input
                    size="lg"
                    id="otp"
                    placeholder="OTP"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    onChange={(e) => handleOnChange(e, "otp")}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={otp}
                    name="otp"
                  />
                </div>
                <Button type="submit" className="mt-6" fullWidth>
                  Verify OTP
                </Button>
              </form>
            </>
          )):(<></>)}
      </Card>
    </div>
  );
};

export default ForgotPassword;
