import spacy
nlp = spacy.load("en")

from nltk.tokenize import sent_tokenize
from SummarizationStrat import SumStrat

class ClusterSentences(SumStrat):

    similarity_threshold = .85

    def create_clusters(self):
        list_of_clusters = []
        list_sentences = self.create_sentences()
        #print(len(list_sentences))
        for sent in list_sentences:
            empty_cluster = []
            if not list_of_clusters:
                empty_cluster.append(sent)
                list_of_clusters.append(empty_cluster)
            else:
                list_scores = []
                for cluster in list_of_clusters:
                    sum = 0
                    if len(list_sentences) < 100:
                        for sentence in cluster:
                            doc1 = nlp(u"{}".format(sent))
                            doc2 = nlp(u"{}".format(sentence))
                            sum = sum + doc1.similarity(doc2)
                        average = sum/len(cluster)
                        list_scores.append(average)
                    else:
                        doc1 = nlp(u"{}".format(sent))
                        doc2 = nlp(u"{}".format(cluster[0]))
                        score = doc1.similarity(doc2)
                        list_scores.append(score)
                if max(list_scores) > self.similarity_threshold:
                    cluster_index = list_of_clusters.index(max(list_of_clusters))
                    list_of_clusters[cluster_index].append(sent)
                else:
                    empty_cluster.append(sent)
                    list_of_clusters.append(empty_cluster)
        for clust in list_of_clusters:
            if len(clust) == 1:
                list_of_clusters.remove(clust)
        return list_of_clusters

    def sentence_importances(self):
        scores = []
        sentences = self.create_sentences()
        clusters = self.create_clusters()
        for sent in sentences:
            bool = False
            for cluster in clusters:
                if sent in cluster:
                    scores.append(len(cluster))
                    bool = True
                    break
            if not bool:
                scores.append(1)
        return scores
