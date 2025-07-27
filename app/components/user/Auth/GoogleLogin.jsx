import { FcGoogle } from 'react-icons/fc';

export default function GoogleLoginButton() {
  return (
    <a
      href="https://sjmart.mostofadev.com/api/auth/google/redirect"
      className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:shadow-md hover:bg-gray-50 transition-all duration-200 px-5 py-2.5 rounded-full w-full max-w-sm mx-auto"
    >
      <FcGoogle className="text-xl" />
      <span className="font-medium">Login with Google</span>
    </a>
  );
}
