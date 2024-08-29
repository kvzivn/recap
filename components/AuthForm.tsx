"use client"
import Link from "next/link"
import React, { useState } from "react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowRight, RotateCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/actions/user.actions"
import { AuthValidation } from "@/lib/validation"
import { toast } from "sonner"
import Logo from "@/components/Logo"
import { cn } from "@/lib/utils"

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const form = useForm<z.infer<typeof AuthValidation>>({
    resolver: zodResolver(AuthValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof AuthValidation>) => {
    setIsLoading(true)

    try {
      if (type === "sign-up") {
        const userData = {
          email: data.email,
          password: data.password,
        }

        const newUser = await signUp(userData)

        if (newUser) router.push("/home")
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })

        if (response) {
          setFadeOut(true)
          router.push("/home")
        }
      }
    } catch (error) {
      toast.error(
        type === "sign-in" ? "Could not log in." : "Could not sign up."
      )
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <section className={cn("transition-opacity", fadeOut && "opacity-0")}>
      <header className="flex flex-col mb-8 gap-5 md:gap-6 items-center">
        <Logo />
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-lg font-semibold">
            {type === "sign-in" ? "Log in to Recap" : "Sign up for Recap"}
          </h1>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="focus-visible:border-stone-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      className="focus-visible:border-stone-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col mt-6 gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <RotateCw className="h-4 w-4 animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : type === "sign-in" ? (
                "Log in"
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <Link
        href={type === "sign-in" ? "/sign-up" : "/sign-in"}
        className="group"
      >
        <div className="mt-8 transition-colors group-hover:border-slate-400">
          <p className="text-[0.8125rem] text-center transition-colors text-neutral-7 group-hover:text-black">
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span className="font-semibold ml-1">
              {type === "sign-in" ? "Sign up" : "Log in"}
              <ArrowRight className="h-4 w-4 ml-0.5 inline transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </span>
          </p>
        </div>
      </Link>
    </section>
  )
}

export default AuthForm
