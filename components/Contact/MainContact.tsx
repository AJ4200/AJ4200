import React, { useState } from "react";
import emailjs from "emailjs-com";

const MainContact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
  const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

  function sendEmail(e: any) {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then(
        (result) => {
          console.log(result.text);
          setShowConfirmation(true);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <form
        className="max-w-md mx-auto p-6 backdrop-blur-md rounded-md shadow-md"
        onSubmit={sendEmail}
      >
        <input type="hidden" name="contact_number" />

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="user_name"
          >
            Name
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            name="user_name"
            id="user_name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="user_email"
          >
            Email
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="email"
            name="user_email"
            id="user_email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            name="message"
            id="message"
          ></textarea>
        </div>

        <button
          className="w-full bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-lg font-semibold">Email sent successfully!</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={closeConfirmation}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContact;
