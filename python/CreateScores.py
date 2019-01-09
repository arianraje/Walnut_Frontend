from SentenceClustering import ClusterSentences
from SentenceFrequencies import CreateFrequencies
from TitleRelationships import TitleSimilarity

from nltk.tokenize import sent_tokenize
from SummarizationStrat import SumStrat

class FinalScores(SumStrat):

    clust = ClusterSentences()
    freq = CreateFrequencies()
    title = TitleSimilarity()

    def scores(self):
        title_scores = self.title.adjusted_scores()
        clust_scores = self.clust.adjusted_scores()
        freq_scores = self.freq.adjusted_scores()
        fin_scores = []
        for i in range(len(clust_scores)):
            if title_scores[i] != 0:
                fin_scores.append(clust_scores[i] + freq_scores[i] + title_scores[i])
            else:
                fin_scores.append(0)
        return fin_scores

    def adjusted_scores(self):
        scores = self.scores()
        adj_scores = []
        seq = sorted(scores)
        index = [seq.index(x) for x in scores]
        for i in index:
            adj_scores.append(i/max(index))
        return adj_scores

    def write_summary(self):
        sentences = self.create_sentences()
        adj_scores = self.adjusted_scores()
        summary = open("/Users/philippeibl/Documents/Walnut_Frontend/python/Summary.txt", "w+")
        summary.write("Generated Summary: \n")
        for i in range(len(adj_scores)):
            if adj_scores[i] > 0.75:
                sentences[i] = sentences[i].replace("\n", " ")
                sentences[i] = sentences[i].replace('","description":', "")
                sentences[i] = sentences[i].replace('","descriptionText":', "")
                summary.write(" - {} \n".format(sentences[i]))

fin_scores = FinalScores()
fin_scores.write_summary()
