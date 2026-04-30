import sys
from docx import Document

def read_docx(file_path, out_path):
    doc = Document(file_path)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(full_text))

if __name__ == '__main__':
    read_docx(sys.argv[1], sys.argv[2])
