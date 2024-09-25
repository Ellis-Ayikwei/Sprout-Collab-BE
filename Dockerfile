# Use an official Python image as a base
FROM python:3.12-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        default-libmysqlclient-dev \
        build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5004

# Run app.py when the container launches
# CMD ["gunicorn", "-b", "0.0.0.0:5000", "api.v1.app:app"]
CMD ["python", "-m", "api.v1.app"]
