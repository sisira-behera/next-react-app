'use client'

import { useSession } from 'next-auth/react';
export default function MyAccountPage() {
    const { data: session } = useSession({ required: true });
    // This is only shown while loading or if not authenticated
    if (!session) {
        return <div className="p-8 text-center">Loading secure content...</div>;
    }
    return (
    <main className="min-h-screen max-w-screen-lg mx-auto bg-gray-50">
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-20">
            <div className="relative w-full md:col-span-10 px-5"> 
            <h1 className="text-3xl font-bold mb-6">My Account</h1>
            <p className="mb-4">Welcome to your protected My Account, {session.user?.name}!</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Your Profile Information</h2>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {session.user?.name}</p>
                    <p><strong>Email:</strong> {session.user?.email}</p>
                    {session.user?.image && (
                        <div>
                            <p className="mb-2"><strong>Profile Image:</strong></p>
                            <img 
                                src={session.user.image} 
                                alt={session.user.name || 'User'} 
                                className="w-24 h-24 rounded"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold mb-2">How This Works</h2>
                <p className="mb-2">
                    This page is protected by two different systems:
                </p>
            </div>
          </div>
        </div>
    </main>
    );
}
