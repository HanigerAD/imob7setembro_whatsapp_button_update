import { toast, Id, UpdateOptions } from 'react-toastify'

const TOAST_OPTIONS_DEFAULT = {
  style: { whiteSpace: 'pre-line' }, isLoading: false, closeButton: true,
} as UpdateOptions;

export class ToastHelper {
  toastLoadingId: Id | undefined

  constructor() {
  }

  loading(conteudo: string) {
    this.toastLoadingId = toast.loading(conteudo);
  }

  success(conteudo: string) {
    if (this.toastLoadingId) {
      toast.update(this.toastLoadingId, { ...TOAST_OPTIONS_DEFAULT, render: conteudo, type: 'success', autoClose: 5000 });
      this.toastLoadingId = undefined;
    } else {
      toast.success(conteudo);
    }
  }

  error(conteudo: string) {
    if (this.toastLoadingId) {
      toast.update(this.toastLoadingId, { ...TOAST_OPTIONS_DEFAULT, render: conteudo, type: 'error' });
      this.toastLoadingId = undefined;
    } else {
      toast.error(conteudo);
    }
  }

  warning(conteudo: string) {
    if (this.toastLoadingId) {
      toast.update(this.toastLoadingId, { ...TOAST_OPTIONS_DEFAULT, render: conteudo, type: 'warning' });
      this.toastLoadingId = undefined;
    } else {
      toast.warning(conteudo);
    }
  }

  info(conteudo: string) {
    if (this.toastLoadingId) {
      toast.update(this.toastLoadingId, { ...TOAST_OPTIONS_DEFAULT, render: conteudo, type: 'info' });
      this.toastLoadingId = undefined;
    } else {
      toast.info(conteudo);
    }
  }
}