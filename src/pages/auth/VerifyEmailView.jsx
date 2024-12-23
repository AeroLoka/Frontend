import VerifyEmail from "../../components/Auth/VerifyEmail";
import AuthLayout from "../../components/Auth/AuthLayout";
import TitleOfPage from "../../components/Title/TitleOfPage";

const VerifyEmailView = () => {
  TitleOfPage("Aeroloka - Reset Password");
  return (
    <AuthLayout title="Reset Password">
      <VerifyEmail />
    </AuthLayout>
  );
};

export default VerifyEmailView;
