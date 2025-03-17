"use client"
import LogOutButton from "@/components/LogOutButton"
import { useAuth } from "@/context/AuthContext"

const ProfileView = () => {
  const { userData } = useAuth()

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <div className="bg-white p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold">{userData?.user.name}</h1>
            <p className="text-black">{userData?.user.email}</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold text-gray-700">Phone:</span>
              <span className="text-gray-600">{userData?.user.phone}</span>
            </div>
            <div className="flex justify-between items-start border-b pb-2">
              <span className="font-semibold text-gray-700">Address:</span>
              <span className="text-gray-600 text-right max-w-xs">{userData?.user.address}</span>
            </div>
            <div className="mt-6 flex  justify-evenly">
              <LogOutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileView

