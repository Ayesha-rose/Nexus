import React from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';

export const TermsOfService: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
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
            Welcome to Nexus! These Terms of Service ("Terms") govern your use of our platform, including our website, mobile applications, and any related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
          </p>
          <p>
            Please read these Terms carefully. If you do not agree with these Terms, you may not use our Services.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">1. User Accounts and Responsibilities</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            To access certain features of our platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          <p>
            You must be at least 18 years old to use our Services. By creating an account, you represent that you meet this requirement.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">2. Use of Our Services</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            You agree to use our Services only for lawful purposes and in accordance with these Terms. You are prohibited from:
          </p>
          <ul>
            <li>Violating any applicable laws or regulations.</li>
            <li>Infringing on the rights of others, including intellectual property rights.</li>
            <li>Uploading or transmitting any material that is harmful, fraudulent, or obscene.</li>
            <li>Interfering with the proper functioning of our Services.</li>
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">3. Intellectual Property</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            All content on our platform, including text, graphics, logos, and software, is the property of Nexus or its licensors and is protected by intellectual property laws. You may not use, reproduce, or distribute any content from our Services without our prior written permission.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">4. Disclaimers and Limitation of Liability</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            Our Services are provided "as is" and "as available" without any warranties of any kind. We do not guarantee that our Services will be uninterrupted, error-free, or secure.
          </p>
          <p>
            To the fullest extent permitted by law, Nexus shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our Services.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">5. Governing Law</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law principles.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">6. Changes to These Terms</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of our Services after any such changes constitutes your acceptance of the new Terms.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:support@nexus.com" className="text-primary-600 hover:underline">
              support@nexus.com
            </a>.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default TermsOfService;