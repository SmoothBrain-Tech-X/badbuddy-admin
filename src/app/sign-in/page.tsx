"use client";
import { signIn } from "next-auth/react";
import { Alert, Button, Card, PasswordInput, TextInput } from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons-react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ error: string }>();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card withBorder maw={400} w={"100%"}>
        <form
          className="flex flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const email = (form.elements.namedItem("email") as HTMLInputElement)
              .value;
            const password = (
              form.elements.namedItem("password") as HTMLInputElement
            ).value;

            await signIn("credentials", {
              email: email,
              password: password,
              callbackUrl: "/",
            });
          }}
        >
          {params.error && <Alert color="red">{params.error}</Alert>}

          <TextInput
            label="Email"
            placeholder="your@email.com"
            name="email"
            required
            leftSection={<IconMail size={16} />}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            name="password"
            leftSection={<IconLock size={16} />}
          />
          <Button type="submit" fullWidth>
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}

export const dynamic = "force-dynamic";
