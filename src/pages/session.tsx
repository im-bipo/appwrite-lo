import Container from "@/components/Container";
import { createSessionByMaginUrl } from "@/lib/account";
import { useLocation } from "wouter";

function Session() {
  const [, setLocation] = useLocation();

  (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");
    if (!secret || !userId) {
      console.log("moye");

      return;
    }
    const user = await createSessionByMaginUrl(secret, userId);
    console.log("user", user);
    setLocation('/');
  })();
  return (
    <Container className="h-screen flex items-center justify-center text-center">
      <p>Logging you in...</p>
    </Container>
  );
}

export default Session;
