import { useState } from "react";
import {
  RefreshCw,
  User,
  Calendar,
  Copy,
  MapPin,
  Shield,
  Check,
} from "lucide-react";
import { Disclaimer, Header, MainLayout, PageLayout } from "./components";
import { calculateLuhnChecksum, generateRandomDate } from "./utils";

export type IdDetails = {
  birthDate: string;
  gender: "Male" | "Female";
  citizenship: "South African Citizen" | "Permanent Resident";
  age: number;
} | null;
const App = () => {
  const [generatedID, setGeneratedID] = useState("");
  const [idDetails, setIdDetails] = useState<IdDetails>(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = generatedID;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy text: ", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const generateRSAID = () => {
    const date = generateRandomDate();
    const yearPart = date.year.toString().slice(-2);
    const monthPart = date.month;
    const dayPart = date.day;

    const sequenceNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    const citizenshipDigit = Math.floor(Math.random() * 2);

    const raceDigit = Math.floor(Math.random() * 2) + 8;

    const first12Digits =
      yearPart +
      monthPart +
      dayPart +
      sequenceNumber +
      citizenshipDigit +
      raceDigit;

    const checkDigit = calculateLuhnChecksum(first12Digits);

    const fullID = first12Digits + checkDigit;

    setGeneratedID(fullID);

    const fullYear =
      parseInt(yearPart) < 25
        ? 2000 + parseInt(yearPart)
        : 1900 + parseInt(yearPart);
    const gender = parseInt(sequenceNumber) >= 5000 ? "Male" : "Female";
    const citizenship =
      citizenshipDigit === 0 ? "South African Citizen" : "Permanent Resident";

    setIdDetails({
      birthDate: `${dayPart}/${monthPart}/${fullYear}`,
      gender: gender,
      citizenship: citizenship,
      age: new Date().getFullYear() - fullYear,
    });
  };

  return (
    <MainLayout>
      <PageLayout>
        <Header />

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <section className="text-center mb-8">
            <button
              onClick={generateRSAID}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center mx-auto gap-2 shadow-md hover:shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Generate RSA ID Number
            </button>
          </section>

          {generatedID && (
            <section className="bg-gray-50 rounded-lg p-6 mb-6">
              <section className="text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  Generated ID Number
                </h3>
                <section className="bg-white border-2 border-indigo-200 rounded-lg p-4 mb-4 relative group">
                  <section className="flex items-center justify-center gap-4">
                    <span className="text-3xl font-mono font-bold text-indigo-600 tracking-wider">
                      {generatedID}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className={`transition-all duration-200 p-2 rounded-lg ${
                        copied
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      } opacity-0 group-hover:opacity-100 focus:opacity-100`}
                      title={copied ? "Copied!" : "Copy to clipboard"}
                    >
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </section>
                  {copied && (
                    <section className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <section className="bg-green-600 text-white text-sm px-3 py-1 rounded-md shadow-lg">
                        Copied to clipboard!
                      </section>
                    </section>
                  )}
                </section>
                <section className="flex items-center justify-center gap-2 text-green-600">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">
                    Valid ID (Luhn algorithm verified)
                  </span>
                </section>
              </section>
            </section>
          )}

          {idDetails && (
            <section className="grid md:grid-cols-2 gap-6">
              <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <section className="flex items-center mb-4">
                  <User className="w-6 h-6 text-blue-600 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-700">
                    Personal Information
                  </h4>
                </section>
                <section className="space-y-3">
                  <section className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium text-gray-800">
                      {idDetails.gender}
                    </span>
                  </section>
                  <section className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium text-gray-800">
                      {idDetails.age} years
                    </span>
                  </section>
                </section>
              </section>

              <section className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                <section className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-green-600 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-700">
                    Birth & Citizenship
                  </h4>
                </section>
                <section className="space-y-3">
                  <section className="flex justify-between">
                    <span className="text-gray-600">Birth Date:</span>
                    <span className="font-medium text-gray-800">
                      {idDetails.birthDate}
                    </span>
                  </section>
                  <section className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-gray-800">
                      {idDetails.citizenship}
                    </span>
                  </section>
                </section>
              </section>
            </section>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <MapPin className="w-6 h-6 text-indigo-600 mr-2" />
            About RSA ID Numbers
          </h3>

          <section className="grid md:grid-cols-2 gap-8">
            <section>
              <h4 className="text-lg font-medium text-gray-700 mb-3">
                Format Structure
              </h4>
              <section className="space-y-2 text-gray-600">
                <p>
                  <strong>YYMMDD:</strong> Date of birth (6 digits)
                </p>
                <p>
                  <strong>SSSS:</strong> Sequence number (4 digits)
                </p>
                <p>
                  <strong>C:</strong> Citizenship (0=SA, 1=Foreign)
                </p>
                <p>
                  <strong>R:</strong> Race classification (obsolete)
                </p>
                <p>
                  <strong>Z:</strong> Luhn check digit
                </p>
              </section>
            </section>

            <section>
              <h4 className="text-lg font-medium text-gray-700 mb-3">
                Luhn Algorithm
              </h4>
              <section className="space-y-2 text-gray-600">
                <p>The Luhn algorithm validates the ID number:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Alternately multiply digits by 2</li>
                  <li>Sum all digits (split double digits)</li>
                  <li>Check digit makes total divisible by 10</li>
                </ul>
              </section>
            </section>
          </section>

          <Disclaimer />
        </section>
      </PageLayout>
    </MainLayout>
  );
};

export default App;
