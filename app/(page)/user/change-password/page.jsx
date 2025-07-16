import PasswordForm from "@/app/components/page/user/password/PasswordForm";
import UserLayout from "@/app/components/ui/layout/UserLayout";

export default function AccountPage() {
  return (
    
    <UserLayout>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Password Settings</h1>
            <PasswordForm />
        </div>
    </UserLayout>
  );
}
