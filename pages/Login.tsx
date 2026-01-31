import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Login: React.FC = () => {
  const { login } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  
  // Credentials State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Verification State
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        setStep('verification');
    }, 1000);
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
        setIsLoading(false);
        login(email, rememberMe);
        navigate('/profile');
    }, 1500);
  };

  const handleCodeChange = (index: number, value: string) => {
      if (value.length > 1) return; // Prevent multi-char
      
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto focus next
      if (value !== '' && index < 4) {
          codeInputs.current[index + 1]?.focus();
      }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
          codeInputs.current[index - 1]?.focus();
      }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="glass-card w-full max-w-md p-8 md:p-12 rounded-3xl shadow-2xl relative z-10 transition-all duration-500">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold mb-2">PEDRO</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">
            {step === 'credentials' ? 'Access Future Luxury' : 'Security Verification'}
          </p>
        </div>

        {step === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                    <div className="relative">
                        <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">email</span>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
                        <a href="#" className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline">Forgot?</a>
                    </div>
                    <div className="relative">
                        <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">lock</span>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 accent-primary rounded cursor-pointer"
                    />
                    <label htmlFor="rememberMe" className="text-sm text-slate-500 dark:text-slate-400 font-medium cursor-pointer select-none">Remember this device</label>
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                        <span>Sign In</span>
                    )}
                </button>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register</Link>
                    </p>
                </div>
            </form>
        ) : (
            <form onSubmit={handleVerificationSubmit} className="space-y-8 animate-fade-in">
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-icons text-primary text-2xl">security</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Please enter the 5-digit code sent to <br/>
                        <span className="font-bold text-slate-900 dark:text-white">{email}</span>
                    </p>
                </div>

                <div className="flex justify-between gap-2">
                    {verificationCode.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => { codeInputs.current[index] = el }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleCodeKeyDown(index, e)}
                            className="w-full aspect-square text-center text-2xl font-bold bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all caret-primary"
                        />
                    ))}
                </div>

                <button 
                    type="submit"
                    disabled={isLoading || verificationCode.some(d => d === '')}
                    className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                        <span>Verify Identity</span>
                    )}
                </button>

                <button 
                    type="button" 
                    onClick={() => setStep('credentials')}
                    className="w-full text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                >
                    Back to Login
                </button>
            </form>
        )}
      </div>
    </div>
  );
};

export default Login;