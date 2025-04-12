import nltk
nltk.download('vader_lexicon')
# from transformers.utils import init_empty_weights
from nltk.sentiment import SentimentIntensityAnalyzer
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax
import torch

# Initialize VADER
sia = SentimentIntensityAnalyzer()

# Initialize Roberta
MODEL = "cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

def polarity_scores_roberta(text):
    encoded_text = tokenizer(text, return_tensors='pt', truncation=True)
    output = model(**encoded_text)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    return {
        'roberta_neg': scores[0],
        'roberta_neu': scores[1],
        'roberta_pos': scores[2]
    }

def analyze_sentiment(reviews):
    vader_summary = {"positive": 0, "neutral": 0, "negative": 0}
    roberta_summary = {"positive": 0, "neutral": 0, "negative": 0}

    for text in reviews:
        vader = sia.polarity_scores(text)
        if vader["compound"] >= 0.05:
            vader_summary["positive"] += 1
        elif vader["compound"] <= -0.05:
            vader_summary["negative"] += 1
        else:
            vader_summary["neutral"] += 1

        roberta = polarity_scores_roberta(text)
        label = max(roberta, key=roberta.get)
        if "pos" in label:
            roberta_summary["positive"] += 1
        elif "neg" in label:
            roberta_summary["negative"] += 1
        else:
            roberta_summary["neutral"] += 1

    return {
        "vader": vader_summary,
        "roberta": roberta_summary
    }
