import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, Share2, PenTool } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal'; // Import the generic Modal component
import { useDropzone } from 'react-dropzone';
import { PreviewModal } from '../../components/modals/PreviewModal';
import SignaturePad from '../../components/documents/SignaturePad'; // Import SignaturePad

interface DocumentFile {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
  lastModified?: string;
  shared?: boolean;
  status: 'Draft' | 'Review' | 'Signed' | 'Rejected';
  signature?: string;
}

const initialDocuments: DocumentFile[] = [
  {
    id: 1,
    name: 'Pitch Deck 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-02-15',
    shared: true,
    url: '/path/to/Pitch Deck 2024.pdf',
    status: 'Draft',
  },
  {
    id: 2,
    name: 'Financial Projections.xlsx',
    type: 'Spreadsheet',
    size: '1.8 MB',
    lastModified: '2024-02-10',
    shared: false,
    url: '/path/to/Financial Projections.xlsx',
    status: 'Draft',
  },
  {
    id: 3,
    name: 'Business Plan.docx',
    type: 'Document',
    size: '3.2 MB',
    lastModified: '2024-02-05',
    shared: true,
    url: '/path/to/Business Plan.docx',
    status: 'Review',
  },
  {
    id: 4,
    name: 'Market Research.pdf',
    type: 'PDF',
    size: '5.1 MB',
    lastModified: '2024-01-28',
    shared: false,
    url: '/path/to/Market Research.pdf',
    status: 'Signed',
    signature: '/path/to/signature.png',
  },
  {
    id: 5,
    name: 'Competitor Analysis.pptx',
    type: 'Presentation',
    size: '3.8 MB',
    lastModified: '2024-01-20',
    shared: true,
    url: '/path/to/Competitor Analysis.pptx',
    status: 'Draft',
  }
];

export const DocumentManagementPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentFile[]>(initialDocuments);
  const [previewFile, setPreviewFile] = useState<DocumentFile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false); // State to control signature pad visibility
  const [signingDocument, setSigningDocument] = useState<DocumentFile | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file, index) => ({
      id: documents.length + index + 1,
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      url: URL.createObjectURL(file),
      status: 'Draft' as const,
    }));
    setDocuments(prev => [...prev, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const openModal = (file: DocumentFile) => {
    setPreviewFile(file);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewFile(null);
  };

  const openSignaturePad = (doc: DocumentFile) => {
    setSigningDocument(doc);
    setShowSignaturePad(true);
  };
  const closeSignaturePad = () => {
    setSigningDocument(null);
    setShowSignaturePad(false);
  };

  const handleSaveSignature = (signatureImage: string) => {
    if (signingDocument) {
      if (!signingDocument.signature) {
        setDocuments(
          documents.map(doc =>
            doc.id === signingDocument.id
              ? { ...doc, signature: signatureImage, status: 'Signed' }
              : doc
          )
        );
        console.log('Signature saved for document:', signingDocument.name);
      }
    }
    closeSignaturePad();
  };

  const handleClearSignature = () => {
    if (signingDocument) {
      setDocuments(
        documents.map(doc =>
          doc.id === signingDocument.id
            ? { ...doc, signature: undefined, status: 'Draft' }
            : doc
        )
      );
      console.log('Signature cleared for document:', signingDocument.name);
    }
  };

  const handleMarkAsInReview = (id: number) => {
    setDocuments(
      documents.map(doc =>
        doc.id === id ? { ...doc, status: 'Review' } : doc
      )
    );
  };

  const handleReject = (id: number) => {
    setDocuments(
      documents.map(doc => (doc.id === id ? { ...doc, status: 'Rejected' } : doc))
    );
  };
  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {previewFile && (
        <PreviewModal
          isOpen={isModalOpen}
          onClose={closeModal}
          file={previewFile}
        />
      )}
      <Modal isOpen={showSignaturePad} onClose={closeSignaturePad} title="Sign Document">
        <SignaturePad onSave={handleSaveSignature} onClear={handleClearSignature} />
      </Modal>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button leftIcon={<Upload size={18} />}>
              Upload Document
            </Button>
          </div>
        </div>
      </div>
      


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium text-gray-900">12.5 GB</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary-600 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-gray-900">7.5 GB</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Access</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Recent Files
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Shared with Me
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Starred
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Trash
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Document list */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Sort by
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {documents.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center px-0 py-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <div className="p-1 bg-primary-50 rounded-lg mr-4">
                      <FileText size={24} className="text-primary-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {doc.name}
                        </h3>
                        {doc.shared && (
                          <Badge variant="secondary" size="sm">Shared</Badge>
                        )}
                        <Badge variant={
                          doc.status === 'Signed' ? 'success' :
                          doc.status === 'Review' ? 'warning' :
                          doc.status === 'Rejected' ? 'error' : 'secondary'
                        } size="sm">{doc.status}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>{doc.type}</span>
                        <span>{doc.size}</span>
                        {doc.lastModified && (
                          <span>Modified {doc.lastModified}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2"
                        aria-label="Preview"
                        onClick={() => openModal(doc)}
                      >
                        Preview
                      </Button>
                      {doc.status === 'Review' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-error-600 hover:text-error-700"
                          aria-label="Reject"
                          onClick={() => handleReject(doc.id)}
                        >
                          Reject
                        </Button>
                      )}
                      {doc.status === 'Draft' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2"
                          aria-label="Mark as In Review"
                          onClick={() => handleMarkAsInReview(doc.id)}
                        >
                          Review
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2"
                        aria-label="Sign"
                        onClick={() => openSignaturePad(doc)}
                      >
                        <PenTool size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2"
                        aria-label="Download"
                        onClick={() => handleDownload(doc.url, doc.name)}
                      >
                        <Download size={18} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2"
                        aria-label="Share"
                      >
                        <Share2 size={18} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 text-error-600 hover:text-error-700"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};