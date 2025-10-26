import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    AlertCircle,
    ArrowRight,
    ArrowLeft,
    Mail,
    Lock,
    CheckCircle2,
    Shield,
    Eye,
    EyeOff
} from 'lucide-react';
import AuthLayout from '@/components/layout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        otp?: string;
        newPassword?: string;
        confirmPassword?: string;
    }>({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    // Email validation
    const validateEmail = (email: string) => {
        if (!email) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    // Password validation
    const validatePassword = (password: string) => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters';
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/(?=.*\d)/.test(password)) {
            return 'Password must contain at least one number';
        }
        return '';
    };

    // Step 1: Send OTP
    const handleSendOTP = (e: React.FormEvent) => {
        e.preventDefault();
        const emailError = validateEmail(email);

        if (emailError) {
            setErrors({ email: emailError });
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        // Simulate API call
        setTimeout(() => {
            // Check if email exists (mock validation)
            if (email === 'billwise@gmail.com') {
                setSuccessMessage('OTP sent successfully! Check your email.');
                setCurrentStep(2);
                setResendTimer(60);
                startResendTimer();
                setErrors({});
            } else {
                setErrorMessage('Email not found. Please check and try again.');
            }
            setIsLoading(false);
        }, 1000);
    };

    // Start resend timer
    const startResendTimer = () => {
        const interval = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Handle OTP input
    const handleOTPChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOTP = [...otp];
        newOTP[index] = value.slice(-1);
        setOtp(newOTP);
        setErrors({ ...errors, otp: '' });

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    // Handle OTP paste
    const handleOTPPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOTP = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
        setOtp(newOTP);
    };

    // Handle backspace
    const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOTP = (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            setErrors({ otp: 'Please enter complete 6-digit OTP' });
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        // Simulate API call
        setTimeout(() => {
            // Mock OTP verification (use '123456' as correct OTP)
            if (otpString === '123456') {
                setSuccessMessage('OTP verified successfully!');
                setCurrentStep(3);
                setErrors({});
            } else {
                setErrorMessage('Invalid OTP. Please try again.');
            }
            setIsLoading(false);
        }, 1000);
    };

    // Resend OTP
    const handleResendOTP = () => {
        setIsLoading(true);
        setErrorMessage('');
        setOtp(['', '', '', '', '', '']);

        setTimeout(() => {
            setSuccessMessage('OTP resent successfully!');
            setResendTimer(60);
            startResendTimer();
            setIsLoading(false);
        }, 1000);
    };

    // Step 3: Reset Password
    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();

        const newPasswordError = validatePassword(newPassword);
        const confirmPasswordError = !confirmPassword
            ? 'Please confirm your password'
            : newPassword !== confirmPassword
                ? 'Passwords do not match'
                : '';

        if (newPasswordError || confirmPasswordError) {
            setErrors({
                newPassword: newPasswordError,
                confirmPassword: confirmPasswordError
            });
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        // Simulate API call
        setTimeout(() => {
            setSuccessMessage('Password reset successfully!');
            setErrors({});
            setIsLoading(false);
            navigate('/login');
        }, 1000);
    };

    return (
        <AuthLayout isFormRightSide={false}>
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-foreground">
                        {currentStep === 1 && 'Forgot Password?'}
                        {currentStep === 2 && 'Verify OTP'}
                        {currentStep === 3 && 'Reset Password'}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        {currentStep === 1 && "Enter your email and we'll send you an OTP"}
                        {currentStep === 2 && 'Enter the 6-digit code sent to your email'}
                        {currentStep === 3 && 'Create a new strong password'}
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`h-2 rounded-full transition-all ${step === currentStep
                                ? 'w-8 bg-primary'
                                : step < currentStep
                                    ? 'w-8 bg-primary/50'
                                    : 'w-2 bg-border'
                                }`}
                        />
                    ))}
                </div>

                {/* Success Message */}
                {successMessage && (
                    <Alert className="bg-primary/10 border-primary/20">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <AlertDescription className="text-primary">{successMessage}</AlertDescription>
                    </Alert>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}

                {/* Step 1: Email Input */}
                {currentStep === 1 && (
                    <form onSubmit={handleSendOTP} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors({ ...errors, email: '' });
                                        setErrorMessage('');
                                        setSuccessMessage('');
                                    }}
                                    className={`pl-11 h-12 ${errors.email ? 'border-destructive' : ''}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-destructive flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 text-background font-semibold text-base hover:bg-primary transition-all duration-300 group"
                        >
                            <span>{isLoading ? 'Sending OTP...' : 'Send OTP'}</span>
                            {!isLoading && (
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            )}
                        </Button>

                        <div className="text-center">
                            <Button type="button" variant="link" className="p-0 h-auto">
                                <Link to="/login" className="flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </Link>
                            </Button>
                        </div>
                    </form>
                )}

                {/* Step 2: OTP Verification */}
                {currentStep === 2 && (
                    <form onSubmit={handleVerifyOTP} className="space-y-5">
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-center block">
                                Enter OTP
                            </Label>
                            <div className="flex justify-center gap-2" onPaste={handleOTPPaste}>
                                {otp.map((digit, index) => (
                                    <Input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOTPChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                                        className={`w-12 h-14 text-center text-lg font-semibold ${errors.otp ? 'border-destructive' : ''
                                            }`}
                                    />
                                ))}
                            </div>
                            {errors.otp && (
                                <p className="text-sm text-destructive flex items-center justify-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.otp}
                                </p>
                            )}
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            {resendTimer > 0 ? (
                                <p>Resend OTP in {resendTimer}s</p>
                            ) : (
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={handleResendOTP}
                                    disabled={isLoading}
                                    className="p-0 h-auto font-semibold"
                                >
                                    Resend OTP
                                </Button>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setCurrentStep(1);
                                    setOtp(['', '', '', '', '', '']);
                                    setErrors({});
                                    setErrorMessage('');
                                    setSuccessMessage('');
                                }}
                                className="flex-1 h-12"
                            >
                                <ArrowLeft className="mr-2 w-5 h-5" />
                                Back
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 text-background font-semibold text-base hover:bg-primary transition-all duration-300 group"
                            >
                                {isLoading ? 'Verifying...' : 'Verify OTP'}
                            </Button>
                        </div>
                    </form>
                )}

                {/* Step 3: Reset Password */}
                {currentStep === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-sm font-medium">
                                New Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="newPassword"
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="Create new password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setErrors({ ...errors, newPassword: '' });
                                        setErrorMessage('');
                                    }}
                                    className={`pl-11 pr-11 h-12 ${errors.newPassword ? 'border-destructive' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="text-sm text-destructive flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.newPassword}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setErrors({ ...errors, confirmPassword: '' });
                                        setErrorMessage('');
                                    }}
                                    className={`pl-11 pr-11 h-12 ${errors.confirmPassword ? 'border-destructive' : ''
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Password Requirements */}
                        <Alert className="bg-muted/50 border-border">
                            <Shield className="h-4 w-4" />
                            <AlertDescription className="text-xs">
                                Password must contain at least 8 characters, including uppercase, lowercase, and
                                numbers.
                            </AlertDescription>
                        </Alert>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 text-background font-semibold text-base hover:bg-primary transition-all duration-300 group"
                        >
                            <span>{isLoading ? 'Resetting Password...' : 'Reset Password'}</span>
                            {!isLoading && (
                                <CheckCircle2 className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                            )}
                        </Button>
                    </form>
                )}

                {/* Help Text */}
                <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
                    <p>
                        Need help?{' '}
                        <Button type="button" variant="link" className="p-0 h-auto font-semibold">
                            Contact Support
                        </Button>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;