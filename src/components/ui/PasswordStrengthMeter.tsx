import React from 'react';

interface PasswordStrengthMeterProps {
  password?: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password = '',
}) => {
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/\d/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const score = getPasswordStrength();
  const strengthLabel =
    score <= 2 ? 'Weak' : score <= 4 ? 'Medium' : 'Strong';
  const strengthColor =
    score <= 2
      ? 'bg-error-500'
      : score <= 4
      ? 'bg-yellow-500'
      : 'bg-success-500';

  return (
    <div className="mt-2">
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full ${strengthColor}`}
          style={{ width: `${(score / 5) * 100}%` }}
        ></div>
      </div>
      <p className={`mt-1 text-sm ${
          score <= 2
            ? 'text-error-500'
            : score <= 4
            ? 'text-yellow-500'
            : 'text-success-500'
        }`}
      >
        Password strength: {strengthLabel}
      </p>
    </div>
  );
};