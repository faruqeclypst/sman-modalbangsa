"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitContactForm } from "@/app/actions/contact";

interface ContactFormProps {
  lang: string;
}

export function ContactForm({ lang }: ContactFormProps) {
  const isId = lang === "id";

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) {
      newErrors.name = isId ? "Nama wajib diisi" : "Nama wajib diisi";
    }
    if (!formData.email.trim()) {
      newErrors.email = isId ? "Email wajib diisi" : "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isId ? "Format email tidak valid" : "Invalid email format";
    }
    if (!formData.message.trim()) {
      newErrors.message = isId ? "Pesan wajib diisi" : "Pesan wajib diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const res = await submitContactForm(
        formData.name,
        formData.email,
        formData.message
      );
      if (res.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-zinc-900/50 backdrop-blur-md p-6 shadow-sm sm:p-8">
      <h3 className="text-xl font-bold text-[color:var(--foreground)]">
        {isId ? "Kirim Pesan" : "Kirim Pesan"}
      </h3>
      <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
        {isId
          ? "Punya pertanyaan atau masukan? Silakan isi formulir berikut."
          : "Have any questions or feedback? Please fill out the form below."}
      </p>

      {status === "success" && (
        <div className="mt-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-4 text-sm font-medium text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/30">
          {isId
            ? "Pesan Anda berhasil dikirim! Terima kasih."
            : "Your message has been sent successfully! Thank you."}
        </div>
      )}

      {status === "error" && (
        <div className="mt-6 rounded-lg bg-rose-50 dark:bg-rose-950/30 p-4 text-sm font-medium text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/30">
          {isId
            ? "Terjadi kesalahan. Silakan coba beberapa saat lagi."
            : "An error occurred. Please try again later."}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-[color:var(--foreground)]"
          >
            {isId ? "Nama" : "Nama"}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={cn(
              "mt-2 block w-full rounded-lg border border-[color:var(--border)] bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-gray-400 focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]",
              errors.name && "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
            )}
            placeholder={isId ? "Nama Lengkap Anda" : "Your Full Name"}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[color:var(--foreground)]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={cn(
              "mt-2 block w-full rounded-lg border border-[color:var(--border)] bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-gray-400 focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]",
              errors.email && "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
            )}
            placeholder="nama@domain.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-[color:var(--foreground)]"
          >
            {isId ? "Pesan" : "Pesan"}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className={cn(
              "mt-2 block w-full rounded-lg border border-[color:var(--border)] bg-white dark:bg-zinc-950/60 px-4 py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-gray-400 focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)] resize-none",
              errors.message && "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
            )}
            placeholder={isId ? "Tulis pesan Anda di sini..." : "Write your message here..."}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-rose-500">{errors.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-[color:var(--primary)] hover:bg-[color:var(--primary)]/90 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
        >
          {status === "submitting"
            ? (isId ? "Mengirim..." : "Sending...")
            : "Kirim Pesan"}
        </Button>
      </form>
    </div>
  );
}
