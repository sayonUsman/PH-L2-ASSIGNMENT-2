import { z } from "zod";

const fullNameValidationSchema = z.object({
  firstName: z.string().refine((value) => /^[A-Z]/.test(value), {
    message: "First Name must start with a capital letter",
  }),
  lastName: z.string(),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const ordersValidationSchema = z.array(
  z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
  })
);

const userValidationSchema = z.object({
  userId: z.number({
    required_error: "User id is required",
  }),
  username: z
    .string({
      required_error: "User Name is required",
    })
    .min(5, { message: "User Name must be 5 or more characters long" }),
  password: z.string({
    required_error: "Password is required",
  }),
  fullName: fullNameValidationSchema,
  age: z.number({
    required_error: "Age is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: ordersValidationSchema.optional(),
});

export default userValidationSchema;
