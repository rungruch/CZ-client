import { useAuth } from "../utils/AuthProvider";

const About = () => {
  const auth = useAuth();

  return (
    <>
      <h1>Ticket</h1>
      <h2>Welcome {auth.user?.name}!</h2>
    </>
  );
};
export default About;
