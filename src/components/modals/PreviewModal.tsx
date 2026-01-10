import React from 'react';
import { Modal } from '../ui/Modal';

interface DocumentFile {
  name: string;
  type: string;
  url: string;
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: DocumentFile | null;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  file,
}) => {
  if (!file) {
    return null;
  }

  const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
  const isImage = file.type.startsWith('image/');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={file.name} size="3xl">
      <div className="flex justify-center items-center h-full">
        {isPdf ? (
          <iframe
            src={file.url}
            className="w-full h-[80vh]"
            title={file.name}
          />
        ) : isImage ? (
          <img src={file.url} alt={file.name} className="max-w-full max-h-[80vh]" />
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-semibold">Preview not available</h2>
            <p className="text-sm text-gray-500">
              Cannot preview this file type.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};