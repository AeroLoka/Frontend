import ResetPassword from "../../components/Auth/ResetPassword";
import AuthLayout from "../../components/Auth/AuthLayout";
import TitleOfPage from "../../components/Title/TitleOfPage";

const ResetPasswordView = () => {
  TitleOfPage("Aeroloka - Reset Password");
  return (
    <AuthLayout title="Reset Password">
      <ResetPassword />
    </AuthLayout>
  );
};

export default ResetPasswordView;
