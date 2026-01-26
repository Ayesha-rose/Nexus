import React from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';

export const CookiePolicy: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
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
            This Cookie Policy explains how Nexus ("we," "us," and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">1. What Are Cookies?</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">2. Why Do We Use Cookies?</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">3. Types of Cookies We Use</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <ul>
            <li>
              <strong>Strictly Necessary Cookies:</strong> These cookies are essential to provide you with services available through our website and to enable you to use some of its features.
            </li>
            <li>
              <strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use.
            </li>
            <li>
              <strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are.
            </li>
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">4. How Can You Control Cookies?</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
        </CardHeader>
        <CardBody className="prose prose-lg max-w-none text-gray-700">
          <p>
            If you have any questions about our use of cookies or other technologies, please email us at{' '}
            <a href="mailto:privacy@nexus.com" className="text-primary-600 hover:underline">
              privacy@nexus.com
            </a>.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default CookiePolicy;