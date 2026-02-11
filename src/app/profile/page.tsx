"use client";
import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import { auth } from "@/lib/firebase";
import { LogoutButton } from "@/components/logout-button";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md flex flex-col items-center gap-6">
      <div>
        {user?.photoURL ? (
          <img src={user.photoURL} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-blue-200" />
        ) : (
          <UserCircle className="w-24 h-24 text-blue-400" />
        )}
      </div>
      <div className="text-center">
        <div className="text-xl font-bold">{user?.displayName || "Explorer"}</div>
        <div className="text-gray-500">{user?.email || ""}</div>
        <div className="mt-2 text-sm font-medium text-blue-600">Grade 4</div>
      </div>
      <LogoutButton />
    </div>
  );
}
