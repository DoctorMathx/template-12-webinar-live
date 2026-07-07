import type { Metadata } from "next";
import { RegisterClient } from "./register-client";
export const metadata: Metadata = { title: "Reserve your seat" };
export default function RegisterPage() { return <RegisterClient />; }
