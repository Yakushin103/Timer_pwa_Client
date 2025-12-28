export interface ModalSaveTimeProps {
  seconds: number;
  minutes: number;
  hours: number;
  handleClose: () => void;
  handleSave: () => void;
  company_name: string;
}
