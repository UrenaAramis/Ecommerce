"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateRegisterForm } from "@/helpers/validate";
import { register } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterView: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Register to iWant
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            address: "",
            phone: "",
          }}
          validate={validateRegisterForm}
          onSubmit={async (values) => {
            await register(values);
            router.push("/login");
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
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Name:
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="John Doe"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Address:
                </label>
                <Field
                  type="text"
                  name="address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="123 Main St"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Phone:
                </label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="+1 (555) 555-5555"
                />
                <ErrorMessage
                  name="phone"
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

              <p className="text-center">
                Already registered?{" "}
                <Link href="/login" className="underline">
                  Log in here!
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterView;
