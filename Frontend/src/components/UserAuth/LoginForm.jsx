"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <Link to="/signup">Signup</Link>
        </CardContent>
      </Card>
    </div>
  );
}
export default LoginForm;
