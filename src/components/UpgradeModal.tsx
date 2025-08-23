
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, Check, X } from "lucide-react";
import { useState } from "react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual signup logic
    console.log('Signup:', { email, password });
    alert('Signup functionality coming soon! For now, enjoy unlimited downloads.');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-surface border-border/50 text-foreground">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2 text-xl">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Crown className="w-4 h-4 text-background" />
              </div>
              <span>Unlock Unlimited Invoices</span>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Value Proposition */}
          <div className="text-center space-y-3">
            <p className="text-muted-foreground">
              You've used all 3 free downloads. Sign up to continue creating professional invoices.
            </p>
            
            <div className="glass rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                <span>Unlimited PDF downloads</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                <span>Save invoice templates</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                <span>Priority customer support</span>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="signup-email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="signup-password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
                placeholder="Create a secure password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary text-background hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              Get Unlimited Access
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Already have an account?{' '}
              <button className="text-primary hover:underline">
                Sign in instead
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
