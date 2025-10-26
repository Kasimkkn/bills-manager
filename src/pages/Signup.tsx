import AuthLayout from '@/components/layout/AuthLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail, User, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        buissnessName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        buissnessName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Password strength indicator
    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        if (strength <= 2) return { strength, label: 'Weak', color: 'text-red-500' };
        if (strength <= 3) return { strength, label: 'Fair', color: 'text-yellow-500' };
        if (strength <= 4) return { strength, label: 'Good', color: 'text-blue-500' };
        return { strength, label: 'Strong', color: 'text-green-500' };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    // Validation functions
    const validatebuissnessName = (name) => {
        if (!name.trim()) {
            return 'Full name is required';
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters';
        }
        return '';
    };

    const validateEmail = (email) => {
        if (!email) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validatePassword = (password) => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
            return 'Password must contain uppercase and lowercase letters';
        }
        if (!/(?=.*\d)/.test(password)) {
            return 'Password must contain at least one number';
        }
        return '';
    };

    const validateConfirmPassword = (confirmPassword, password) => {
        if (!confirmPassword) {
            return 'Please confirm your password';
        }
        if (confirmPassword !== password) {
            return 'Passwords do not match';
        }
        return '';
    };

    // Handle input changes
    const handlebuissnessNameChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, buissnessName: value });
        setErrors({ ...errors, buissnessName: validatebuissnessName(value) });
        setSignupError('');
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, email: value });
        setErrors({ ...errors, email: validateEmail(value) });
        setSignupError('');
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, password: value });
        setErrors({
            ...errors,
            password: validatePassword(value),
            confirmPassword: formData.confirmPassword ? validateConfirmPassword(formData.confirmPassword, value) : ''
        });
        setSignupError('');
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, confirmPassword: value });
        setErrors({ ...errors, confirmPassword: validateConfirmPassword(value, formData.password) });
        setSignupError('');
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const buissnessNameError = validatebuissnessName(formData.buissnessName);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);

        setErrors({
            buissnessName: buissnessNameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        });

        // Check terms acceptance
        if (!acceptTerms) {
            setSignupError('Please accept the Terms and Conditions to continue');
            return;
        }

        // If there are validation errors, don't proceed
        if (buissnessNameError || emailError || passwordError || confirmPasswordError) {
            return;
        }

        // Simulate signup process
        setIsLoading(true);
        setTimeout(() => {
            console.log('Signup successful:', formData);
            setSignupSuccess(true);
            setSignupError('');
            setIsLoading(false);

            // Reset form after success
            setTimeout(() => {
                alert('Account created successfully! Redirecting to login...');
            }, 1000);
        }, 1000);
    };

    return (
        <AuthLayout isFormRightSide={true}>
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-foreground">Sign Up</h1>
                </div>

                {/* Success Alert */}
                {signupSuccess && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            Account created successfully! Redirecting to login...
                        </AlertDescription>
                    </Alert>
                )}

                {/* Error Alert */}
                {signupError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{signupError}</AlertDescription>
                    </Alert>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Buissness Input */}
                    <div className="space-y-2">
                        <Label htmlFor="buissnessName" className="text-sm font-medium">
                            Buissness Name
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                id="buissnessName"
                                type="text"
                                placeholder="John Doe"
                                value={formData.buissnessName}
                                onChange={handlebuissnessNameChange}
                                className={`pl-11 h-12 ${errors.buissnessName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            />
                        </div>
                        {errors.buissnessName && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.buissnessName}
                            </p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleEmailChange}
                                className={`pl-11 h-12 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handlePasswordChange}
                                className={`pl-11 pr-11 h-12 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {formData.password && !errors.password && (
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">Password strength:</span>
                                    <span className={`font-medium ${passwordStrength.color}`}>
                                        {passwordStrength.label}
                                    </span>
                                </div>
                                <div className="flex gap-1 h-1">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div
                                            key={level}
                                            className={`flex-1 rounded-full transition-all ${level <= passwordStrength.strength
                                                ? passwordStrength.strength <= 2
                                                    ? 'bg-red-500'
                                                    : passwordStrength.strength <= 3
                                                        ? 'bg-yellow-500'
                                                        : passwordStrength.strength <= 4
                                                            ? 'bg-blue-500'
                                                            : 'bg-green-500'
                                                : 'bg-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {errors.password && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Re-enter your password"
                                value={formData.confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={`pl-11 pr-11 h-12 ${errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-2 pt-2">
                        <Checkbox
                            id="terms"
                            checked={acceptTerms}
                            onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                            className="mt-1"
                        />
                        <Label htmlFor="terms" className="cursor-pointer font-normal text-sm text-muted-foreground leading-relaxed">
                            I agree to the{' '}
                            <button type="button" className="text-primary hover:underline font-medium">
                                Terms and Conditions
                            </button>
                        </Label>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading || signupSuccess}
                        className="w-full h-12 text-background font-semibold text-base hover:bg-primary transition-all duration-300 group"
                    >
                        <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                        {!isLoading && !signupSuccess && (
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        )}
                    </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-background text-foreground">or continue with</span>
                    </div>
                </div>


                {/* Google Sign Up */}
                <Button variant="outline" className="h-11 w-full">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                </Button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to={'/login'} type="button" className="text-primary hover:underline font-semibold">
                        Log in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Signup;