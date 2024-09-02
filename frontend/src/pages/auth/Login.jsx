import React from "react";
import Navbar from "../../components/shared/Navbar";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { RadioGroup } from "../../components/ui/radio-group";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md my-10 p-4"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name="Email" placeholder="abc@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center my-5 gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recuiter"
                  className="cursor-pointer"
                />

                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button className="w-full my-4" type="submit">
            Login
          </Button>
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-[#F83002]">
              Sign Up
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
}
