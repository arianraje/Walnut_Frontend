import os
from io import StringIO

import docx2txt
import enchant
import urllib3
from bs4 import BeautifulSoup
from nltk.tokenize import word_tokenize, sent_tokenize
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from PIL import Image
import pytesseract

class DocCreator:

    def filter_results(self, list_sents):
        dictionary = enchant.Dict("en_US")
        new_sentences = []
        for sent in list_sents:
            percent_words = [0, 0]
            words = word_tokenize(sent)
            for word in words:
                try:
                    if dictionary.check(word):
                        percent_words[0] = percent_words[0] + 1
                    else:
                        percent_words[1] = percent_words[1] + 1
                except:
                    percent_words[1] = percent_words[1] + 1
            if percent_words[0] > percent_words[1]:
                new_sentences.append(sent)
        return new_sentences

    def txt_from_HTML(self):
        fin_sentences = []
        url = input("Enter the url here: ")
        http = urllib3.PoolManager()
        response = http.request('POST', url)
        raw = BeautifulSoup(response.data, "lxml").get_text()
        raw = os.linesep.join([s for s in raw.splitlines() if s])
        txt = sent_tokenize(raw)
        new_sentences = self.filter_results(txt)
        for line in new_sentences:
            if line.count("\n") <= 1 and len(word_tokenize(line)) > 3 and "<" not in line and "subscrib" not in line:
                fin_sentences.append(line)
            elif line.find("\n") == 1:
                fin_sentences.append(line)
        fin_txt = ' '.join(fin_sentences)
        fin_txt = fin_txt.replace(".", ". ")
        return fin_txt

    def txt_from_Docx(self):
        filepath = input("Enter the filepath here: ")
        txt = docx2txt.process(filepath)
        list_sents = sent_tokenize(txt)
        new_sentences = self.filter_results(list_sents)
        fin_txt = ' '.join(new_sentences)
        return fin_txt

    def txt_from_txt(self):
        filepath = open("/Users/philippeibl/Documents/Walnut_Frontend/python/tmp.txt", "r")
        txt = filepath.read()
        list_sents = sent_tokenize(txt)
        new_sentences = self.filter_results(list_sents)
        fin_txt = ' '.join(new_sentences)
        return fin_txt

    def txt_from_PDF(self, pages=None):
        if not pages:
            pagenums = set()
        else:
            pagenums = set(pages)
        output = StringIO()
        manager = PDFResourceManager()
        converter = TextConverter(manager, output, laparams=LAParams())
        interpreter = PDFPageInterpreter(manager, converter)
        file = input("Enter the filepath here: ")
        infile = open(file, 'rb')
        for page in PDFPage.get_pages(infile, pagenums):
            interpreter.process_page(page)
        infile.close()
        converter.close()
        txt = output.getvalue()
        txt = txt.replace("$", " ")
        list_sents = sent_tokenize(txt)
        fin_sentences = []
        for line in list_sents:
            if line.count("\n") <= 6:
                fin_sentences.append(line)
        fin_txt = ' '.join(fin_sentences)
        return fin_txt

    def txt_from_Image(self):
        file = input("Enter the filepath here: ")
        txt = pytesseract.image_to_string(Image.open(file))
        list_sents = sent_tokenize(txt)
        new_sentences = self.filter_results(list_sents)
        fin_txt = ' '.join(new_sentences)
        return fin_txt

    def find_txt(self):
        choice = 1
        if int(choice) == 1:
            return self.txt_from_txt()
        elif int(choice) == 2:
            return self.txt_from_Docx()
        elif int(choice) == 3:
            return self.txt_from_PDF()
        elif int(choice) == 4:
            return self.txt_from_HTML()
        else:
            return self.txt_from_Image()
