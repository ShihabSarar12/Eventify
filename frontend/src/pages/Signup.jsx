import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';

export default function Signup() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'student',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.firstName ||
            !form.lastName ||
            !form.email ||
            !form.password
        ) {
            setError('All fields are required.');
            return;
        }

        setLoading(true); // Start loading

        try {
            // Prepare the request body in the required format
            const requestBody = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
                role: form.role,
            };

            // Send POST request to the backend
            const response = await fetch(
                'http://localhost:3000/api/v1/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody), // Send the required format data
                }
            );

            const data = await response.json();

            if (response.ok) {
                // If registration is successful, log the user in
                login({
                    id: data.insertId, // Assuming insertId is returned after registration
                    name: `${form.firstName} ${form.lastName}`,
                    email: form.email,
                    role: form.role,
                });

                // Redirect based on role
                navigate(form.role === 'admin' ? '/admin' : '/student');
            } else {
                setError(data.message || 'Failed to register.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred during registration.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-lg'>
            <h1 className='text-2xl font-bold text-white'>Create an Account</h1>
            <p className='mt-1 text-sm text-slate-300'>Join Eventify today!</p>

            {error && (
                <div className='mt-3 rounded-lg bg-red-500/15 text-red-300 ring-1 ring-red-500/30 px-3 py-2 text-sm'>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-slate-200'>
                        First Name
                    </label>
                    <input
                        type='text'
                        name='firstName'
                        value={form.firstName}
                        onChange={handleChange}
                        className='mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition'
                        placeholder='Your first name'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-slate-200'>
                        Last Name
                    </label>
                    <input
                        type='text'
                        name='lastName'
                        value={form.lastName}
                        onChange={handleChange}
                        className='mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition'
                        placeholder='Your last name'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-slate-200'>
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        className='mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition'
                        placeholder='you@example.com'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-slate-200'>
                        Password
                    </label>
                    <input
                        type='password'
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                        className='mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition'
                        placeholder='••••••••'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-slate-200'>
                        Role
                    </label>
                    <select
                        name='role'
                        value={form.role}
                        onChange={handleChange}
                        className='mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition'
                    >
                        <option className='bg-neutral-900' value='student'>
                            Student
                        </option>
                        <option className='bg-neutral-900' value='admin'>
                            Club Admin
                        </option>
                    </select>
                </div>

                <button
                    type='submit'
                    className='w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 ring-1 ring-white/10 transition'
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>

            <p className='mt-6 text-center text-sm text-slate-300'>
                Already have an account?{' '}
                <Link
                    to='/login'
                    className='font-medium text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline'
                >
                    Login
                </Link>
            </p>
        </div>
    );
}
