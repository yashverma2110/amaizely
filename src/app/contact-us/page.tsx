import React from 'react';

export default function ContactUs() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
            <p className="text-gray-600">
              Have questions about Amaizely? We'd love to hear from you. Send us a message
              and we'll respond as soon as possible.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <a
              href="mailto:contact@amaizely.com"
              className="text-blue-600 hover:underline"
            >
              contact@amaizely.com
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Office Address</h2>
            <address className="not-italic text-gray-600">
              Yashoda Nagar<br />
              Kanpur<br />
              Uttar Pradesh, India
            </address>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
