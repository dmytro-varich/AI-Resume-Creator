#! /bin/bash
. ./env/bin/activate

python -m uvicorn main:app --host 0.0.0.0 --port 7052 

