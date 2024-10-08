import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/renderer/components/ui/toast';
import { useToast } from '@/renderer/hooks/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={3000}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className='interactive' id="ai-toast-close-button" />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
