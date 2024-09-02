import React from "react";
import Navbar from "../../components/shared/Navbar";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md my-10 p-4"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" name="fullname" placeholder="raheel..." />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name="Email" placeholder="abc@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="text" name="phoneNumber" placeholder="+92304..." />
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
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" className="cursor-pointer" />
            </div>
          </div>
          <Button className="w-full my-4" type="submit">
            Sign Up
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#F83002]">
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
}
