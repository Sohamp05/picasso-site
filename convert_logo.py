import fitz
import sys

def convert_pdf_to_png(pdf_path, png_path):
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)
    
    # Increase resolution by setting a zoom matrix
    zoom = 4    # zoom factor
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, alpha=True)
    
    pix.save(png_path)
    print(f"Saved logo to {png_path}")

if __name__ == "__main__":
    convert_pdf_to_png(sys.argv[1], sys.argv[2])
