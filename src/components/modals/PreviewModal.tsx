import React from 'react';
import { Modal } from '../ui/Modal';

interface DocumentFile {

  name: string;

  type: string;

  url: string;

  signature?: string;

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

  const isPdf = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={file.name} size="3xl">
      <div className="flex flex-col justify-center items-center h-full">
        {isPdf ? (
          <iframe
            src={file.url}
            className="w-full h-[70vh]"
            title={file.name}
          />
        ) : isImage ? (
          <img src={file.url} alt={file.name} className="max-w-full max-h-[70vh]" />
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-semibold">Preview not available</h2>
            <p className="text-sm text-gray-500">
              Cannot preview this file type.
            </p>
          </div>
        )}
        {file.signature && (
          <div className="mt-4 p-4 border-t border-gray-200 w-full">
            <h3 className="text-lg font-semibold mb-2 text-center">Signature</h3>
            <img src={file.signature} alt="Signature" className="max-w-full max-h-48 mx-auto" />
          </div>
        )}
      </div>
    </Modal>
  );
};