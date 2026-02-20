import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import LabelEncoder
import joblib


def train_gpu_model():
    csv_path = 'data/data_3.csv'
    model_name = 'gpu_model.pkg'
    encoder_name = 'gpu_encoder.pkg'

    df = pd.read_csv(csv_path, header=None)

    X = df.iloc[:, :6].values
    y_raw = df.iloc[:, 6].values

    encoder = LabelEncoder()
    y = encoder.fit_transform(y_raw)

    model = GradientBoostingClassifier(
        n_estimators=1000,
        learning_rate=0.05,
        max_depth=4,
        random_state=42
    )
    model.fit(X, y)

    joblib.dump(model, model_name)
    joblib.dump(encoder, encoder_name)

    print(f"Модель обучена")

if __name__ == "__main__":
    train_gpu_model()