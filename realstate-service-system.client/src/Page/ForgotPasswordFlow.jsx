import React, { useState } from 'react';
import { message } from 'antd';
import { OTPVerification, ChangePassword, EmailSendingOTP } from './../components/Forgotpassword/index';

const ForgotPasswordFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState('');

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <EmailSendingOTP
                        onSuccess={(email) => {
                            setEmail(email);
                            setCurrentStep(1);
                        }}
                        onBack={() => window.history.back()}
                    />
                );
            case 1:
                return (
                    <OTPVerification
                        email={email}
                        onSuccess={() => setCurrentStep(2)}
                        onBack={() => setCurrentStep(0)}
                    />
                );
            case 2:
                return (
                    <ChangePassword
                        onSuccess={() => {
                            message.success('Password changed successfully! You can now login with your new password.');
                            // Redirect to login page after successful password change
                            setTimeout(() => {
                                window.location.href = '/login';
                            }, 2000);
                        }}
                        onBack={() => setCurrentStep(1)}
                    />
                );
            default:
                return <EmailSendingOTP onSuccess={(email) => {
                    setEmail(email);
                    setCurrentStep(1);
                }} />;
        }
    };

    return renderStep();
};

export default ForgotPasswordFlow;