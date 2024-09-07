declare type SignUpParams = {
  email: string
  password: string
}

declare type LoginUser = {
  email: string
  password: string
}

declare type User = {
  $id: string
  email: string
  userId: string
  remindersLeft: number
}

declare type NewUserParams = {
  userId: string
  email: string
  password: string
}

declare interface getUserInfoProps {
  userId: string
}

declare interface signInProps {
  email: string
  password: string
}

declare type CreateReminderParams = {
  prompt: string
  summary: string
}

declare type CheckoutTransactionParams = {
  buyerId: string
}

declare type CreateTransactionParams = {
  stripeId: string
  buyerId: string
}
