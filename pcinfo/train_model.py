import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

def train_from_csv():
    csv_path = 'data/data_1.csv'
    model_name = 'psu_model.pkg'

    df = pd.read_csv(csv_path, header=None)

    X = df.iloc[:, :6].values
    y = df.iloc[:, 6].values

    model = LinearRegression()
    model.fit(X, y)

    joblib.dump(model, model_name)
    print(f"Модель обучена")

if __name__ == "__main__":
    train_from_csv()