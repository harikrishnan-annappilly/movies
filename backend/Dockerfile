FROM python:3.12.1-slim-bullseye

RUN apt update
RUN apt install tzdata
RUN ln -sf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime

# Create and switch to new path
RUN mkdir /app
WORKDIR /app

# Install the dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy app contents
COPY . .
RUN python ./util/sample_data_gen.py
RUN find . -type f -exec sed -i "s/{{build_time}}/$(date +'%d %b %Y, %I:%M:%S %p %Z')/g" {} +
RUN find . -type f -exec sed -i "s/{{build_using}}/Python 🐍 Dev Server ⚙️ in Docker 🐋/g" {} +

# Switch to non-root user
USER daemon

# Start the app when docker is running
ENTRYPOINT [ "python", "app.py" ]
