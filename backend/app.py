from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import logging
import os
import numpy as np
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Ensure CORS allows requests from localhost:3000

# Set up logging
logging.basicConfig(level=logging.INFO)


@app.route('/')
def home():
    return "Welcome to the Flask Backend!"


@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.get_json()
    if data.get('data') == 'trigger':
        app.logger.info('Special input received!')
        response = {'alert': 'Special input received!'}
    else:
        response = {'data': data.get('data')}
    return jsonify(response)


def extract_numbers_before_mp(text):
    try:
        text = str(text)
        matches = re.findall(r'\b(\d+)\s*mp\b', text, re.IGNORECASE)
        if matches:
            return int(matches[0])
        else:
            return None
    except Exception as e:
        print(f"Error occurred while extracting numbers before 'mp': {e}")
        return None


@app.route('/api/convert', methods=['GET'])
def convert_xlsx_to_json():
    xlsx_path = os.path.join(os.path.dirname(__file__), '123.xlsx')
    try:
        df = pd.read_excel(xlsx_path)

        # Log DataFrame to inspect its structure
        app.logger.info(f"DataFrame: {df}")

        # Ensure correct column headers
        df.columns = ['ID', 'Zone', 'Price', 'Type', 'Square Meters', 'Description', 'Proprietor', 'Phone Number',
                      'Days Since Posted', 'Date and Time Posted']

        # Remove "EUR" from the Price column and keep only digits
        def clean_price(price):
            try:
                return float(price.replace(' EUR', '').replace('.', '').replace(',', '').strip())
            except (ValueError, AttributeError):
                return None  # Handle non-numeric prices gracefully

        df['Price'] = df['Price'].apply(clean_price)

        # Use extract_numbers_before_mp to clean "Square Meters" column
        df['Square Meters'] = df['Square Meters'].apply(extract_numbers_before_mp)

        # Replace NaN values with None (null in JSON)
        df = df.replace({np.nan: None})

        # Convert DataFrame to JSON
        json_data = df.to_dict(orient='records')

        # Log JSON Data
        app.logger.info(f"JSON Data: {json_data}")
        app.logger.info(f"JSON Data Type: {type(json_data)}")
        app.logger.info(f"Is JSON Data an Array: {isinstance(json_data, list)}")

        # Return JSON response
        return jsonify(json_data)
    except Exception as e:
        app.logger.error('Error processing the XLSX file', exc_info=True)
        return jsonify({'error': str(e)}), 500


@app.route('/api/delete', methods=['POST'])
def delete_row():
    data = request.get_json()
    row_id = data.get('id')

    xlsx_path = os.path.join(os.path.dirname(__file__), '123.xlsx')
    try:
        df = pd.read_excel(xlsx_path)
        df.columns = ['ID', 'Zone', 'Price', 'Type', 'Square Meters', 'Description', 'Proprietor', 'Phone Number',
                      'Days Since Posted', 'Date and Time Posted']

        df = df[df['ID'] != row_id]

        df.to_excel(xlsx_path, index=False)

        return jsonify({'status': 'success'})
    except Exception as e:
        app.logger.error('Error deleting row from the XLSX file', exc_info=True)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
