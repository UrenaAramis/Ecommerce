import Swal, { SweetAlertIcon } from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { ILoginProps, IRegisterProps } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const showAlert = (title: string, text: string, icon:SweetAlertIcon ) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "OK",
    customClass: {
      popup: "bg-black text-white rounded-xl shadow-lg", 
      title: "text-lg font-bold text-white", 
      confirmButton: "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2", 
    },
  });
};


export async function register(userData: IRegisterProps) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    showAlert("Success", "User registered successfully", "success");
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    showAlert("Error", `Failed to register: ${errorMessage}`, "error");
    throw error;
  }
}

export async function login(userData: ILoginProps) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    showAlert("Success", "User logged in successfully", "success");
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    showAlert("Error", `Failed to log in: ${errorMessage}`, "error");
    throw error;
  }
}
