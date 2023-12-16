FROM python:3.12.1-slim-bullseye

# Create and switch to new path
RUN mkdir /app
WORKDIR /app

# Install the dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy app contents
COPY . .
RUN python ./util/sample_data_gen.py

# Start the app when docker is running
ENTRYPOINT [ "python", "app.py" ]
