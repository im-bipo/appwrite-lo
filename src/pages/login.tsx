import Layout from "@/components/Layout";
import Container from "@/components/Container";
import FormRow from "@/components/FormRow";
import FormLabel from "@/components/FormLabel";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import { createMagicalUrl } from "@/lib/account";
import { useState } from "react";

function LogIn() {
  const [token, setToken] = useState<
    { id: string; expire: string } | undefined
  >();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };
    const token = await createMagicalUrl(target.email.value);
    setToken(token);
  };
  return (
    <Layout>
      <Container>
        <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-xs border border-slate-200 dark:border-slate-500 rounded p-6 mx-auto"
        >
          <FormRow className="mb-5">
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputText id="email" name="email" type="email" />
          </FormRow>
          <Button>Submit</Button>
        </form>
        <div className="text-center py-2">
          {token &&
            `Check your mail for login Url`}
        </div>
      </Container>
    </Layout>
  );
}

export default LogIn;
