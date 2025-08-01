import { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = "Մուտքագրեք բովանդակությունը..." }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && editorRef.current && !quillRef.current) {
      import('quill').then((Quill) => {
        const quill = new Quill.default(editorRef.current!, {
          theme: 'snow',
          placeholder,
          modules: {
            toolbar: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'align': [] }],
              ['blockquote', 'code-block'],
              ['link', 'image'],
              ['clean']
            ],
          },
        });

        quill.on('text-change', () => {
          const content = quill.root.innerHTML;
          onChange(content);
        });

        if (value) {
          quill.root.innerHTML = value;
        }

        quillRef.current = quill;
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="bg-background border rounded-md">
      <div ref={editorRef} className="min-h-[300px]" />
    </div>
  );
};

export default RichTextEditor;