# 📚 KCA University Document Upload Guide

You have **3 options** to upload your KCA University documents to the knowledge base:

## 🎯 **Option 1: Text Upload (Recommended)**

### **✅ Best for:** Quick setup, reliable processing
### **📝 How to:**

1. **Open the text upload script:**
   ```bash
   code upload-kca-documents.ts
   ```

2. **Replace placeholder content** with your actual KCA documents:
   - Find sections marked `REPLACE THIS CONTENT WITH YOUR ACTUAL...`
   - Copy text from your PDFs and paste it in
   - Keep the same structure but update with real information

3. **Run the upload:**
   ```bash
   npm run upload-kca
   ```

### **📋 Document Categories:**
- `kca-university-overview.txt` - Mission, vision, programs
- `admission-requirements.txt` - Entry requirements, application process
- `academic-calendar.txt` - Semester dates, registration periods
- `student-services.txt` - Library, accommodation, health services
- `fees-structure.txt` - Tuition fees, payment methods

---

## 🎯 **Option 2: PDF Upload (Automatic)**

### **✅ Best for:** If you want to upload PDF files directly
### **📝 How to:**

1. **Create a pdfs folder:**
   ```bash
   mkdir pdfs
   ```

2. **Add your PDF files** to the `pdfs` folder:
   ```
   pdfs/
   ├── admission-requirements.pdf
   ├── academic-calendar.pdf
   ├── student-handbook.pdf
   ├── fees-structure.pdf
   └── course-catalog.pdf
   ```

3. **Run the PDF upload:**
   ```bash
   npm run upload-pdfs
   ```

### **📋 Supported Files:**
- Any PDF files in the `pdfs` folder
- Automatically extracts text and creates embeddings
- Handles multiple PDFs at once

---

## 🎯 **Option 3: Manual Database Insert**

### **✅ Best for:** Advanced users, custom content
### **📝 How to:**

1. **Use the original upload script:**
   ```bash
   npm run upload-docs
   ```

2. **Edit the script directly** with your content
3. **Customize categories** and document structure

---

## 🚀 **After Upload:**

### **✅ Test Your Knowledge Base:**
1. Visit your live site: https://ai-sdk-preview-internal-knowledge-base-example-2km2ep3xr.vercel.app
2. Register a student account
3. Ask questions like:
   - "What are the admission requirements for Business programs?"
   - "When does the next semester start?"
   - "How much are the fees for IT courses?"
   - "What student services are available?"

### **✅ Share with Students:**
- Share the URL with KCA University students
- They can register and start asking questions immediately
- No more searching through PDFs!

---

## 💡 **Tips:**

### **For Best Results:**
- **Use clear, complete text** from your official documents
- **Include specific details** like dates, requirements, fees
- **Organize by category** (admission, calendar, services, etc.)
- **Test with real questions** students would ask

### **Document Structure:**
- Use **headings** to organize content
- Include **specific details** and numbers
- Add **contact information** where relevant
- Keep **official language** from university documents

---

## 🆘 **Need Help?**

### **Common Issues:**
- **No text extracted from PDF?** → Try Option 1 (copy-paste text)
- **Upload fails?** → Check your environment variables
- **Questions not answered?** → Make sure your documents contain the relevant information

### **Environment Variables Needed:**
- `GROQ_API_KEY` - For AI responses
- `GOOGLE_GENERATIVE_AI_API_KEY` - For embeddings
- `POSTGRES_URL` - For database storage

---

## 🎓 **Ready to Help KCA Students!**

Once uploaded, your knowledge base will help students get instant answers about:
- ✅ Admission requirements and processes
- ✅ Academic calendar and important dates
- ✅ Student services and facilities
- ✅ Fees structure and payment information
- ✅ Course information and requirements

**Choose the option that works best for you and get started!** 🚀