FROM python:3.11.2-slim

ARG GIT_COMMIT_VERSION
ENV GIT_COMMIT_VERSION=$GIT_COMMIT_VERSION


WORKDIR /src
RUN mkdir static

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

COPY requirements.txt ./
RUN pip install -r ./requirements.txt



COPY src/ .

EXPOSE 8000
CMD python3 main.py
