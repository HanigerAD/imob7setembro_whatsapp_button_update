import { toast, Id } from 'react-toastify'

export class ToastHelper {
  toastId: Id | undefined

  constructor() {
  }

  loading(conteudo: string) {
    this.toastId = toast.loading(conteudo);
  }

  success(conteudo: string) {
    if (this.toastId) {
      toast.update(this.toastId, { render: conteudo, type: 'success', isLoading: false, closeButton: true, autoClose: 5000 });
    } else {
      toast.success(conteudo);
    }
  }

  error(conteudo: string) {
    if (this.toastId) {
      toast.update(this.toastId, { render: conteudo, type: 'error', isLoading: false, closeButton: true });
    } else {
      toast.error(conteudo);
    }
  }

  warning(conteudo: string) {
    if (this.toastId) {
      toast.update(this.toastId, { render: conteudo, type: 'warning', isLoading: false, closeButton: true });
    } else {
      toast.warning(conteudo);
    }
  }

  info(conteudo: string) {
    if (this.toastId) {
      toast.update(this.toastId, { render: conteudo, type: 'info', isLoading: false, closeButton: true });
    } else {
      toast.info(conteudo);
    }
  }
}