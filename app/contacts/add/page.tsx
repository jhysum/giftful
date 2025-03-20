import ContactForm from "@/components/contact/contact-form";

export default function AddContactPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Contact</h1>
      <div className="max-w-md">
        <ContactForm />
      </div>
    </div>
  );
}
