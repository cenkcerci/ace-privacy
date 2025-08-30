import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sign Up</h1>
          <p className="text-gray-600 mt-2">Create your PolicyGen account</p>
        </div>
        <SignUp />
      </div>
    </div>
  )
}