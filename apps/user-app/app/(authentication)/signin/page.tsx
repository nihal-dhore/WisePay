"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { useFormState } from "react-dom";
import zod from "zod";
import { useForm } from "react-hook-form";
import { credentialsSchema } from "../../schemas/src/credentialsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { onSubmitAction } from "../../lib/actions/onSubmitHandler";
export default function () {
  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  });

  const form = useForm<zod.output<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      password: ""
    }
  });
  return (
    <Form {...form}>
      <form
        className="space-y-8 max-w-72"
        action={formAction}
        onSubmit={form.handleSubmit(console.log)}
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              {/* <FormDescription>User Phone Number</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              {/* <FormDescription>User Password</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  );
}
