FROM python:latest

WORKDIR /minato

EXPOSE 80

COPY main.py .

RUN python -m venv env
RUN ls
RUN . ./env/bin/activate 


# setup reqs
COPY requirements.txt .
RUN pip install -U pip --root-user-action ignore
RUN pip install -r requirements.txt --root-user-action ignore



CMD python -m uvicorn main:app --host 0.0.0.0 --port 80 
 
