"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { UrlData } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { pushUrlEntry } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  link: z.string().url(),
})

export function LinkSubmitForm() {
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await pushUrlEntry(values.link)

    if (!data) {
      toast({
        title: "Error!",
        description: "There was an error",
      })
      return
    }

    toast({
      title: "Link shortened!",
      description: "You new link is: https://urlique.studio/" + data.display_id,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex space-x-5 mx-auto"
      >
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="px-40 md:px-20"
                  placeholder="https://urlique.studio/"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
