import spacy
nlp = spacy.load("en")

from nltk.tokenize import sent_tokenize
from SummarizationStrat import SumStrat

class TitleSimilarity(SumStrat):

    # raw_title = input("Enter the title of the document: ")
    raw_title = "Climate change is scary. 'Rat explosion' is way scarier."
    title_doc = nlp(u"{}".format(raw_title))

    def sentence_importances(self):
        scores = []
        sentences = self.create_sentences()
        for raw_sent in sentences:
            sent = nlp(u"{}".format(raw_sent))
            if self.raw_title.lower() not in raw_sent.lower():
                scores.append(sent.similarity(self.title_doc))
            else:
                scores.append(0)
        return scores
