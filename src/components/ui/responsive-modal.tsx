import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  open,
  onOpenChange,
  title,
  children,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className='bg-white border-white/20 max-h-[90vh]'>
          <DrawerHeader>
            <DrawerTitle className='text-black font-bricola'>
              {title}
            </DrawerTitle>
          </DrawerHeader>
          <div className='p-6 overflow-y-auto flex-1'>{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton={true}
        className='bg-white border-white/20 max-w-4xl max-h-[90vh] overflow-y-auto'
      >
        <DialogHeader>
          <DialogTitle className='text-black font-bricola'>{title}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveModal;
