import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Create from './createUser';
const CreateUser = () => {
  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey="6LdXS7cdAAAAAKpzlFA5oHnaB8tPUF2ZtAIqVCRc">
        <Create />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default CreateUser;
