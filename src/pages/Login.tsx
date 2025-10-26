import AuthLayout from '@/components/layout/AuthLayout';
import TemplatePickerModal from '@/components/TemplatePickerModal';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const LoginPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleCreateInvoice = () => {
        setIsOpen(true);
    };
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Real-time email validation
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

    // Real-time password validation
    const validatePassword = (password) => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters';
        }
        return '';
    };

    // Handle email change with validation
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, email: value });
        setErrors({ ...errors, email: validateEmail(value) });
        setLoginError('');
    };

    // Handle password change with validation
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, password: value });
        setErrors({ ...errors, password: validatePassword(value) });
        setLoginError('');
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        setErrors({
            email: emailError,
            password: passwordError
        });

        // If there are validation errors, don't proceed
        if (emailError || passwordError) {
            return;
        }

        // Check credentials
        setIsLoading(true);
        setTimeout(() => {
            if (formData.email === 'billwise@gmail.com' && formData.password === 'Billwise@123') {
                console.log('Login successful:', formData);
                setLoginError('');
                // Redirect or perform success action here
                alert('Login successful!');
            } else {
                setLoginError('Invalid email or password. Please try again.');
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <>
            <AuthLayout isFormRightSide={false}>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                    </div>

                    {/* Login Error Alert */}
                    {loginError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{loginError}</AlertDescription>
                        </Alert>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
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
                                    value={formData.email}
                                    onChange={handleEmailChange}
                                    className={`pl-11 h-12 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-destructive flex items-center gap-1">
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
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handlePasswordChange}
                                    className={`pl-11 pr-11 h-12 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-destructive flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                                />
                                <Label htmlFor="remember" className="cursor-pointer font-normal">
                                    Remember me
                                </Label>
                            </div>
                            <Button type="button" variant="link" className="p-0 h-auto font-medium">
                                <Link to={'/forgot-password'}>Forgot password?</Link>
                            </Button>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 text-background font-semibold text-base hover:bg-primary transition-all duration-300 group"
                        >
                            <span>{isLoading ? 'Logging in...' : 'Login to BillEase'}</span>
                            {!isLoading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
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

                    <Button variant="outline" className="h-11 w-full">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </Button>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-foreground">
                        Don't have an account?{' '}
                        <Button type="button" variant="link" className="p-0 h-auto font-semibold">
                            <Link to={'/signup'}>Sign up for free</Link>
                        </Button>
                    </p>

                    {/* Guest Access */}
                    <div className="pt-4 border-t border-border">
                        <p className="text-center text-sm text-foreground mb-3">
                            Want to try without signing up?
                        </p>
                        <Button onClick={() => setIsOpen(true)} variant="outline" className="w-full h-11">
                            Continue as Guest
                        </Button>
                    </div>
                </div>
            </AuthLayout>
            <TemplatePickerModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    );
};

export default LoginPage;