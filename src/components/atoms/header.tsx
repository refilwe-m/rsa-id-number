import { Shield } from "lucide-react";

export const Header = () => (
  <header className="text-center py-10">
    <section className="flex items-center justify-center mb-4">
      <Shield className="w-12 h-12 text-indigo-600 mr-3" />
      <h1 className="text-4xl font-bold text-gray-800">RSA ID Generator</h1>
    </section>
    <p className="text-lg text-gray-600">
      Generate valid South African ID numbers using the Luhn algorithm
    </p>
  </header>
);
