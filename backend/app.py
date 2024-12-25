from flask import Flask, jsonify, request
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Constant for the number of articles per page
PER_PAGE = 12

# Function to generate unique articles for each page
def generate_articles_for_page(page):
    start_id = (page - 1) * PER_PAGE + 1
    end_id = start_id + PER_PAGE
    articles = [
        {"id": i, "title": f"Breaking News: Event {i}", "content": f"Content of article {i}. This is a detailed description of event {i}. The article provides insights into the latest happenings in the world of news and current events."}
        if i % 3 != 0 else 
        {"id": i, "title": f"Opinion: Thought on Topic {i}", "content": f"Content of opinion article {i}. A deep dive into the perspectives and views on topic {i}, analyzing the social, political, and cultural implications."}
        for i in range(start_id, end_id)
    ]
    return articles

@app.route('/articles', methods=['GET'])
def get_articles():
    try:
        # Simulate user identification (e.g., via a header or token)
        user_id = request.headers.get('Authorization', 'anonymous')

        # Simulate a bad response randomly
        if random.choice([True, False]):
            return jsonify({"error": "Oops! Something went terribly wrong. Our servers are currently on a coffee break. Please try again later!"}), 500

        # Get pagination parameters
        page = int(request.args.get('page', 1))

        # Set the maximum number of pages
        max_pages = 15

        # Generate articles for the current page
        paginated_articles = generate_articles_for_page(page)

        # Calculate total pages (for pagination logic)
        total_articles = max_pages * PER_PAGE  # Total number of articles across all pages
        total_pages = max_pages
        is_next = page < total_pages

        # Return paginated response
        return jsonify({
            "page": page,
            "per_page": PER_PAGE,
            "is_next": is_next,
            "data": paginated_articles
        }), 200

    except Exception as e:
        # Return detailed error message
        return jsonify({"error": "An error occurred", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)