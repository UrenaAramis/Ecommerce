"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Cookies from "js-cookie"

const LogOutButton: React.FC = () => {
  const { setUserData } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "bg-black text-white rounded-xl shadow-lg",
        title: "text-lg font-bold text-white",
        confirmButton:
          "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2",
        cancelButton:
          "bg-gray-500 hover:bg-gray-400 text-white rounded-xl px-4 py-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setUserData(null);
        localStorage.removeItem("userSession");
        localStorage.removeItem("cart");
        Cookies.remove("userData");
       

        Swal.fire({
          title: "Logged out",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            popup: "bg-black text-white rounded-xl shadow-lg",
            title: "text-lg font-bold text-white",
            confirmButton:
              "bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-4 py-2",
          },
        }).then(() => {
          router.push("/");
        });
      }
    });
  };

  return (
    <button
      className="inline-flex items-center justify-center rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
