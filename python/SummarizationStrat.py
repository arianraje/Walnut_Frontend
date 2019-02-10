from DocumentCreator import DocCreator
import os
from nltk.tokenize import sent_tokenize

class SumStrat():

    dc = DocCreator()
    txt_to_summarize = ''

    txt = dc.find_txt()
    if txt != "Filetype Not Recognized":
        txt_to_summarize = os.linesep.join([s for s in txt.splitlines() if s])
    else:
        txt_to_summarize = txt

    def sentence_importances(self):
        pass

    def create_sentences(self):
        if txt_to_summarize != "Filetype Not Recognized":
            sentence_tokens = sent_tokenize(self.txt_to_summarize)
            return sentence_tokens
        else:
            return "Filetype Not Recognized"

    def adjusted_scores(self):
        scores = self.sentence_importances()
        adj_scores = []
        for score in scores:
            if max(scores) != 0:
                adj_scores.append(score / max(scores))
            else:
                adj_scores.append(0)
        return adj_scores
