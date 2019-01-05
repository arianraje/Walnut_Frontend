from nltk.tokenize import sent_tokenize, word_tokenize
import os
import collections
from SummarizationStrat import SumStrat

class CreateFrequencies(SumStrat):

    stop_words = open("/Users/philippeibl/Documents/Summa-Summarum-Backend/python/Stop_Words")
    remove = stop_words.read()

    def create_word_tokens(self, string):
        words = word_tokenize(string)
        return words

    def filter_txt(self):
        stop_words = self.create_word_tokens(self.remove)
        txt = self.create_word_tokens(self.txt_to_summarize.lower())
        filtered_txt = [str for str in txt if str not in stop_words]
        return filtered_txt

    def find_frequencies(self):
        txt = self.filter_txt()
        counter = collections.Counter(txt)
        return list(counter.keys()), list(counter.values())

    def sentence_importances(self):
        sentences = self.create_sentences()
        words, freqs = self.find_frequencies()
        scores = []
        for sent in sentences:
            score = 0
            lower_sent = sent.lower()
            for word in lower_sent:
                if word in words:
                    score = score + freqs[words.index(word)]
            scores.append(score)
        return scores
