"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { UrlData } from "@prisma/client"
import QRCode from "qrcode.react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { siteConfig } from "@/config/site"
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

import { Icons } from "./icons"

const formSchema = z.object({
  link: z.string().url(),
})

export function LinkSubmitForm() {
  const [currentData, setCurrentData] = useState<UrlData>()
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

    setCurrentData(data)
  }

  function handleCopy() {
    let url: string = generateLink()
    navigator.clipboard.writeText(url)

    toast({
      title: "Link copied!",
      description: "You've successfully copied the link.",
    })
  }

  function generateLink(): string {
    return `${siteConfig.baseUrl}/${currentData?.display_id}`
  }

  return (
    <section>
      <div>
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
                      className="md:px-20"
                      placeholder={siteConfig.baseUrl}
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
      </div>
      {currentData && (
        <div className="flex flex-col items-center">
          <p className="flex mt-10">
            <Button
              variant="outline"
              size="icon"
              className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted"
            >
              <Icons.copy
                onClick={handleCopy}
                className="h-5 w-5 text-foreground"
              />
            </Button>
            <div className="flex items-center">
              <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
              <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                {generateLink()}
              </div>
            </div>
          </p>
          <QRCode value={generateLink()} className="mt-5" size={200}></QRCode>
        </div>
      )}
    </section>
  )
}
