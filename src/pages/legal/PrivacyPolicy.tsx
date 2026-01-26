import React from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-1">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            Welcome to Nexus! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services. By using our Services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            We may collect personal information from you in a variety of ways, including, but not limited to, when you create an account, fill out a form, or use our Services. The types of personal information we may collect include:
          </p>
          <ul>
            <li>
              <strong>Personal Identification Information:</strong> Name, email address, phone number, and other contact details.
            </li>
            <li>
              <strong>Financial Information:</strong> Bank account and payment card details for transactions.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, and usage data.
            </li>
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            We use the information we collect for various purposes, including to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our Services.</li>
            <li>Process your transactions and manage your account.</li>
            <li>Improve, personalize, and expand our Services.</li>
            <li>Communicate with you, either directly or through one of our partners.</li>
            <li>Detect and prevent fraud.</li>
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">3. Sharing Your Information</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">4. Data Security</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">5. Your Data Protection Rights</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul>
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right of rectification.</li>
            <li>The right to object to our processing of your personal data.</li>
            <li>The right of restriction.</li>
            <li>The right to data portability.</li>
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">6. Changes to This Privacy Policy</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@nexus.com" className="text-primary-600 hover:underline">
              privacy@nexus.com
            </a>.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;