"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLoginForm } from "@/helpers/validate";
import { login } from "@/helpers/auth.helper";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

const LoginView: React.FC = () => {
  const { setUserData } = useAuth();
  const router = useRouter();

  return (
    <div className=" flexitems-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login to iWant
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validateLoginForm}
          onSubmit={async (values) => {
            const response = await login(values);
            setUserData({ token: response.token, user: response.user });
            Cookies.set(
              "userData",
              JSON.stringify({ token: response.token, user: response.user })
            );
            router.push("/");
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="example@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="••••••••"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className="w-full bg-black text-white py-2 rounded-lg transition duration-300 font-semibold 
                  disabled:bg-gray-200 disabled:cursor-not-allowed hover:bg-gray-500"
              >
                Submit
              </button>

              <p>
                Don&apos;t have an account?
                <Link href="/register" className="underline"> Sign up here!</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginView;
