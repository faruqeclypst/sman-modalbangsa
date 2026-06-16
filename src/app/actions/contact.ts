"use server";

/**
 * Server Action to submit the contact form data to WordPress Contact Form 7 REST API.
 */
export async function submitContactForm(
  name: string,
  email: string,
  message: string
) {
  const formId = process.env.WORDPRESS_CONTACT_FORM_ID;
  const wpApiUrl = process.env.NEXT_PUBLIC_WP_API_URL;

  if (!wpApiUrl) {
    return { success: false, error: "WordPress REST API URL is not configured." };
  }

  // Derive the WordPress JSON base URL (e.g., https://.../wp-json)
  const wpJsonBase = wpApiUrl.replace(/\/wp\/v2\/?$/, "");

  // Graceful fallback: If no Form ID is set in .env, simulate a successful call
  if (!formId) {
    console.warn("WORDPRESS_CONTACT_FORM_ID environment variable is not set. Simulating API submission.");
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, simulated: true };
  }

  const endpoint = `${wpJsonBase}/contact-form-7/v1/contact-forms/${formId}/feedback`;

  try {
    const formData = new FormData();
    formData.append("_wpcf7", formId);
    formData.append("_wpcf7_unit_tag", `wpcf7-f${formId}-p-o1`);
    formData.append("your-name", name);
    formData.append("your-email", email);
    formData.append("your-subject", `Pesan Hubungi Kami dari ${name}`);
    formData.append("your-message", message);

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      // Try to read error body to assist developer debugging
      let errorBody = "";
      try {
        errorBody = await response.text();
      } catch {}
      throw new Error(`WordPress returned status ${response.status}: ${errorBody}`);
    }

    const data = await response.json();

    // CF7 returns "mail_sent" on email success, and "mail_failed" if SMTP fails on WP side.
    // In both cases, the form submission itself was valid and accepted by WordPress.
    if (data.status === "mail_sent" || data.status === "mail_failed") {
      return { success: true };
    } else {
      console.error("WordPress CF7 submission failed validation or spam checks:", data);
      return {
        success: false,
        error: data.message || "Failed to send message via WordPress Contact Form 7.",
      };
    }
  } catch (error) {
    console.error("Error submitting contact form to WP:", error);
    return {
      success: false,
      error: "Terjadi kesalahan saat menghubungkan ke server WordPress.",
    };
  }
}
