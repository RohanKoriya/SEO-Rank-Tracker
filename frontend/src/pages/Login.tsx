import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Mail,
  Lock,
  Loader2,
  ChartNoAxesColumnIcon,
  User2Icon,
  Eye,
  EyeOff,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

export default function Login({ state }: { state: string }) {
  const [isLoginState, setIsLoginState] = useState(state === "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useApp();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (isLoginState) {
      result = await login(email, password);
    } else {
      result = await register(name, email, password);
    }

    if (result.success) {
      const redirect = searchParams.get("redirect") || "/dashboard";
      navigate(redirect);
    } else {
      toast.error(result.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Subtle background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(var(--primary) / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md"
            aria-label="Rank Pilot home"
          >
            <div className="size-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ChartNoAxesColumnIcon
                size={14}
                className="text-primary"
                aria-hidden="true"
              />
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Ranklytics
            </span>
          </Link>

          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            {isLoginState ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 text-center">
            {isLoginState
              ? "Sign in to continue to Ranklytics"
              : "Start analyzing your SEO for free"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
            aria-label={isLoginState ? "Sign in form" : "Create account form"}
          >
            {/* Name field (register only) */}
            {!isLoginState && (
              <div>
                <label
                  htmlFor="auth-name"
                  className="block text-xs font-medium text-foreground mb-1.5"
                >
                  Full name
                </label>
                <div className="relative">
                  <User2Icon
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  <input
                    id="auth-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="auth-email"
                className="block text-xs font-medium text-foreground mb-1.5"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70"
                  aria-hidden="true"
                />
                <input
                  id="auth-email"
                  type="email"
                  required
                  autoComplete={isLoginState ? "email" : "username"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="auth-password"
                  className="block text-xs font-medium text-foreground"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70"
                  aria-hidden="true"
                />
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete={
                    isLoginState ? "current-password" : "new-password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    isLoginState ? "Your password" : "At least 6 characters"
                  }
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-colors focus-visible:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={14} aria-hidden="true" />
                  ) : (
                    <Eye size={14} aria-hidden="true" />
                  )}
                </button>
              </div>
              {!isLoginState && (
                <p className="mt-1.5 text-[12px] text-muted-foreground/90">
                  Use 6+ characters with a mix of letters and numbers.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="login-submit-btn"
              disabled={loading}
              className="w-full mt-2 py-2.5 rounded-lg bg-primary text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              style={{ color: "var(--background)" }}
            >
              {loading ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                  <span>
                    {isLoginState ? "Signing in…" : "Creating account…"}
                  </span>
                </>
              ) : isLoginState ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>

        {/* Toggle auth mode */}
        <p className="text-center text-sm text-muted-foreground mt-5">
          {isLoginState ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLoginState((prev) => !prev)}
            className="text-primary hover:underline underline-offset-2 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          >
            {isLoginState ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
