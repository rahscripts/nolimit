'use client';

import { useState } from "react";
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefualt();

        const res = await signIn('credentials', {
            email, 
            password,
            redirect:false,
        });

        if (!res.error) {
            window.location.href = "/dashboard";

        } else {
            alert ("Wrong email and password");
        }
    };


    return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 border rounded-xl w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        <button className="bg-black text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}