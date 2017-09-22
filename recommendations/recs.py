
from collections import defaultdict

from surprise import Reader, Dataset, evaluate, SVD

# connecting to a PostgreSQL database
# db = dataset.connect('postgresql://raiders:theLostApp@localhost:5432/thesis_devel')

# Utilizing SVD Algorithm - Singular Value Composition
'''Return the top-N recommendation for each user from a set of predictions.

    Args:
        predictions(list of Prediction objects): The list of predictions, as
            returned by the test method of an algorithm.
        n(int): The number of recommendation to output for each user. Default is 10.

    Returns:
    A dict where keys are user (raw) ids and values are lists of tuples:
        [(raw item id, rating estimation), ...] of size n.
    '''


def n_recs(predictions, n=10):
    # First map the predictions to each user.
    top_n = defaultdict(list)
    for uid, iid, true_r, est, _ in predictions:
        top_n[uid].append((iid, est))

    # Then sort the predictions for each user and retrieve the k highest ones.
    for uid, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[uid] = user_ratings[:n]

    return top_n

# Load the movielens-100k dataset (download it if needed),
# First train an SVD algorithm on the movielens dataset.
data = Dataset.load_builtin('ml-100k')
trainset = data.build_full_trainset()
# We'll use the famous SVD algorithm.
algo = SVD()
algo.train(trainset)

# Than predict ratings for all pairs (u, i) that are NOT in the training set.
testset = trainset.build_anti_testset()
predictions = algo.test(testset)

top_n = n_recs(predictions, n=10)

# Print the recommended items for each user
# print(top_n);
for uid, user_ratings in top_n.items():
    print(uid, [iid for (iid, _) in user_ratings])

#Want to Return the Top 10 for one user
